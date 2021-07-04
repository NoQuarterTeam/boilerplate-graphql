import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql"
import { Inject, Service } from "typedi"
import { AuthenticationError } from "apollo-server-express"
import { User, Role, FindManyUserArgs } from "@generated"

import { UserService } from "./user.service"
import { AuthResponse } from "./responses/auth.response"
import { LoginInput } from "./inputs/login.input"
import { prisma } from "../../lib/prisma"
import { ResolverContext } from "../shared/resolverContext"
import { RegisterInput } from "./inputs/register.input"
import { ContextUser } from "../shared/contextUser"
import { createToken, decryptToken } from "../../lib/jwt"
import { ResetPasswordInput } from "./inputs/resetPassword.input"
import { UserMailer } from "./user.mailer"
import { CurrentUser } from "../shared/currentUser"
import { UsersResponse } from "./responses/users.response"
import { UseAuth } from "../shared/middleware/UseAuth"
import { UseCacheControl } from "../shared/middleware/UseCacheControl"

@Service()
@Resolver(() => User)
export default class UserResolver {
  @Inject(() => UserMailer)
  userMailer: UserMailer
  @Inject(() => UserService)
  userService: UserService

  @UseAuth([Role.ADMIN])
  @Query(() => UsersResponse)
  async users(@Args() args: FindManyUserArgs): Promise<UsersResponse> {
    const [items, count] = await prisma.$transaction([
      prisma.user.findMany(args),
      prisma.user.count({ ...args, take: undefined, skip: undefined }),
    ])
    return { items, count }
  }

  // ME
  @Query(() => User, { nullable: true })
  me(@ContextUser() user: ContextUser): User | null {
    return user
  }

  // LOGIN
  @Mutation(() => AuthResponse)
  async login(@Arg("data") data: LoginInput, @Ctx() context: ResolverContext): Promise<AuthResponse> {
    const user = await this.userService.login(data)
    const token = this.userService.createAuthToken(user)
    context.req.user = user
    context.req.currentUser = user
    return { user, token }
  }

  // LOGIN ADMIN
  @Mutation(() => AuthResponse)
  async loginAdmin(@Arg("data") data: LoginInput, @Ctx() context: ResolverContext): Promise<AuthResponse> {
    const user = await this.userService.login(data)
    if (user.role !== Role.ADMIN) throw new AuthenticationError("Not authorized")
    const token = this.userService.createAuthToken(user)
    context.req.user = user
    context.req.currentUser = user
    return { user, token }
  }

  // REGISTER
  @Mutation(() => AuthResponse)
  async register(@Arg("data") data: RegisterInput, @Ctx() context: ResolverContext): Promise<AuthResponse> {
    const user = await this.userService.register(data)
    const token = this.userService.createAuthToken(user)
    context.req.user = user
    context.req.currentUser = user
    return { user, token }
  }

  // FORGOT PASSWORD
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { email } })
    if (user) {
      const token = createToken({ id: user.id })
      this.userMailer.sendResetPasswordLink(user, token)
    }
    return true
  }

  // DESTROY ACCOUNT
  @Mutation(() => Boolean)
  async destroyAccount(@CurrentUser() user: User): Promise<boolean> {
    await prisma.user.delete({ where: { id: user.id } })
    return true
  }

  // RESET PASSWORD
  @Mutation(() => Boolean)
  async resetPassword(@Arg("data") data: ResetPasswordInput): Promise<boolean> {
    try {
      const payload = decryptToken<{ id: string }>(data.token)
      const user = await prisma.user.update({ where: { id: payload.id }, data: { password: data.password } })
      this.userMailer.sendPasswordChanged(user)
      return true
    } catch (error) {
      return false
    }
  }

  @FieldResolver(() => String)
  fullName(@Root() user: User) {
    if (!user.firstName && !user.lastName) return ""
    return (user.firstName + " " + user.lastName).trim()
  }

  @UseCacheControl({ maxAge: 3600 })
  @FieldResolver(() => String)
  email(@Root() user: User, @CurrentUser() currentUser: User) {
    if (currentUser.role !== Role.ADMIN && user.id !== currentUser.id) return ""
    return user.email
  }
}
