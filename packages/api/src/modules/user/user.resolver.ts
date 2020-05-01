import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql"
import { Inject } from "typedi"

import { decryptToken, createToken } from "../../lib/jwt"

import { User } from "./user.entity"
import { UserService } from "./user.service"
import { UserMailer } from "./user.mailer"

import { UpdateUserInput } from "./inputs/updateUser.input"
import { ResetPasswordInput } from "./inputs/resetPassword.input"
import { UserRepository } from "./user.repository"
import { CurrentUser } from "../shared/context/currentUser"
import { RegisterInput } from "./inputs/register.input"
import { AuthResponse } from "./responses/auth.response"
import { LoginInput } from "./inputs/login.input"

@Resolver(() => User)
export class UserResolver {
  @Inject(() => UserService)
  userService: UserService
  @Inject(() => UserMailer)
  userMailer: UserMailer
  @Inject(() => UserRepository)
  userRepository: UserRepository

  // ME
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@CurrentUser() currentUser: User): Promise<User> {
    return currentUser
  }

  // UPDATE ME
  @Authorized()
  @Mutation(() => User, { nullable: true })
  async updateMe(
    @CurrentUser() currentUser: User,
    @Arg("data") data: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(currentUser.id, data)
  }

  // LOGIN
  @Mutation(() => AuthResponse)
  async login(@Arg("data") data: LoginInput): Promise<AuthResponse> {
    const user = await this.userService.login(data)
    const token = this.userService.createAuthToken(user)
    return { user, token }
  }

  // REGISTER
  @Mutation(() => AuthResponse)
  async register(@Arg("data") data: RegisterInput): Promise<AuthResponse> {
    const user = await this.userService.create(data)
    const token = this.userService.createAuthToken(user)
    this.userMailer.sendWelcomeEmail(user)
    return { user, token }
  }

  // LOGOUT
  @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  logout(): boolean {
    return true
  }

  // FORGOT PASSWORD
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findByEmail(email)
      if (user) {
        // create token that expires in 1d
        // use current password as hash so that when the password is changed,
        // this token no longer works, and invalidates the link
        const token = createToken(
          { id: user.id, preResetPasswordHash: user.password },
          { expiresIn: "1d" },
        )
        this.userMailer.sendResetPasswordLink(user, token)
      }
    } finally {
      return true
    }
  }

  // RESET PASSWORD
  @Mutation(() => Boolean)
  async resetPassword(@Arg("data") data: ResetPasswordInput): Promise<boolean> {
    const payload = decryptToken<{ id: string; preResetPasswordHash: string }>(
      data.token,
    )
    await this.userService.resetPassword(
      payload.id,
      payload.preResetPasswordHash,
      data.password,
    )
    return true
  }
}
