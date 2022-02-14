import { AuthenticationError } from "apollo-server-express"
import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { Inject, Service } from "typedi"

import { FindFirstUserArgs, FindManyUserArgs, Role } from "@generated"

import { createToken, decodeRefreshToken, decodeToken } from "../../lib/jwt"
import { prisma } from "../../lib/prisma"
import { ContextUser } from "../shared/contextUser"
import { CurrentUser } from "../shared/currentUser"
import { UseAuth } from "../shared/middleware/UseAuth"
import { ResolverContext } from "../shared/resolverContext"
import { LoginInput } from "./inputs/login.input"
import { RegisterInput } from "./inputs/register.input"
import { ResetPasswordInput } from "./inputs/resetPassword.input"
import { UpdateUserInput } from "./inputs/updateUser.input"
import { AuthResponse } from "./responses/auth.response"
import { RefreshTokenResponse } from "./responses/refreshToken.response"
import { UsersResponse } from "./responses/users.response"
import { UserMailer } from "./user.mailer"
import { User } from "./user.model"
import { UserService } from "./user.service"

@Service()
@Resolver(() => User)
export default class UserResolver {
  @Inject(() => UserMailer)
  userMailer: UserMailer
  @Inject(() => UserService)
  userService: UserService

  @UseAuth([Role.ADMIN])
  @Query(() => User, { nullable: true })
  async user(@Args() args: FindFirstUserArgs): Promise<User | null> {
    return await prisma.user.findFirst(args)
  }

  @UseAuth([Role.ADMIN])
  @Query(() => UsersResponse)
  async users(@Args() args: FindManyUserArgs): Promise<UsersResponse> {
    const items = await prisma.user.findMany(args)
    const count = await prisma.user.count({ ...args, take: undefined, skip: undefined })
    return { items, count }
  }

  // ME
  @Query(() => User, { nullable: true })
  me(@ContextUser() user: ContextUser): User | null {
    return user
  }

  // UPDATE ME
  @UseAuth()
  @Mutation(() => User)
  async updateMe(@CurrentUser() currentUser: User, @Arg("data") data: UpdateUserInput): Promise<User> {
    return await prisma.user.update({ where: { id: currentUser.id }, data })
  }

  // LOGIN
  @Mutation(() => AuthResponse)
  async login(@Arg("data") data: LoginInput, @Ctx() context: ResolverContext): Promise<AuthResponse> {
    const user = await this.userService.login(data)
    const tokens = this.userService.createAuthTokens(user)
    context.req.user = user
    context.req.currentUser = user
    return { user, ...tokens }
  }

  // REFRESH TOKEN
  @Query(() => RefreshTokenResponse)
  async refreshToken(@Arg("refreshToken") refreshToken: string): Promise<RefreshTokenResponse> {
    let id: string | undefined
    try {
      id = decodeRefreshToken<{ id: string }>(refreshToken).id
    } catch (error) {
      throw new AuthenticationError("Expired refresh token")
    }
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) throw new AuthenticationError("Invalid refresh token")
    const tokens = this.userService.createAuthTokens(user)
    return tokens
  }

  // REGISTER
  @Mutation(() => AuthResponse)
  async register(@Arg("data") data: RegisterInput, @Ctx() context: ResolverContext): Promise<AuthResponse> {
    const user = await this.userService.register(data)
    const tokens = this.userService.createAuthTokens(user)
    context.req.user = user
    context.req.currentUser = user
    return { user, ...tokens }
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
      const payload = decodeToken<{ id: string }>(data.token)
      const user = await prisma.user.update({ where: { id: payload.id }, data: { password: data.password } })
      this.userMailer.sendPasswordChanged(user)
      return true
    } catch (error) {
      return false
    }
  }
}
