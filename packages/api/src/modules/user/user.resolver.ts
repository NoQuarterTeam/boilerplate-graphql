import { Resolver, Query, Ctx, Mutation, Arg, Authorized } from "type-graphql"

import { ResolverContext } from "../../lib/types"
import { createToken, decryptToken } from "../../lib/jwt"

import { User } from "./user.entity"
import { UserService } from "./user.service"
import { UserMailer } from "./user.mailer"
import { RegisterInput, LoginInput, UpdateInput } from "./user.input"
import { ResetPasswordInput } from "./inputs/resetPassword.input"
import { cookieName } from "../../lib/config"
import { UserRepository } from "./user.repository"
import { CurrentUser } from "../shared/middleware/currentUser"

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly userMailer: UserMailer,
  ) {}

  // ME
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@CurrentUser() currentUser: User): Promise<User> {
    return currentUser
  }

  // REGISTER
  @Mutation(() => User)
  async register(
    @Arg("data") data: RegisterInput,
    @Ctx() { req }: ResolverContext,
  ): Promise<User> {
    const user = await this.userService.create(data)
    if (req.session) req.session.user = user
    this.userMailer.sendWelcomeEmail(user)
    return user
  }

  // LOGIN
  @Mutation(() => User)
  async login(
    @Arg("data") data: LoginInput,
    @Ctx() { req }: ResolverContext,
  ): Promise<User> {
    const user = await this.userService.login(data)
    if (req.session) req.session.user = user
    return user
  }

  // UPDATE USER
  @Authorized()
  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("data") data: UpdateInput,
    @CurrentUser() currentUser: User,
    @Ctx() { req: { session } }: ResolverContext,
  ): Promise<User | null> {
    const user = await this.userService.update(currentUser.id, data)
    if (session) session.user = user
    return user
  }

  // LOGOUT
  @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  async logout(@Ctx() { req, res }: ResolverContext): Promise<boolean> {
    await new Promise(ok => req.session && req.session.destroy(() => ok()))
    res.clearCookie(cookieName)
    return true
  }

  // FORGOT PASSWORD
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) throw new Error("user not found")
    const token = await createToken({ id: user.id })
    this.userMailer.sendResetPasswordLink(user, token)
    return true
  }

  // RESET PASSWORD
  @Mutation(() => Boolean)
  async resetPassword(
    @Arg("data")
    data: ResetPasswordInput,
  ): Promise<boolean> {
    const payload = await decryptToken<{ id: string }>(data.token)
    await this.userService.update(payload.id, { password: data.password })
    return true
  }
}
