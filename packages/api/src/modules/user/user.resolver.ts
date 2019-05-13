import { Resolver, Query, Ctx, Mutation, Arg, Authorized } from "type-graphql"

import { User } from "./user.entity"
import { UserService } from "./user.service"
import { ResolverContext } from "../../lib/types"
import { LoginInput, RegisterInput, UpdateInput } from "./user.input"
import { createToken } from "../../lib/jwt"
import { UserAuthResponse } from "./user.response"

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // ME
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@Ctx() { userId }: ResolverContext): Promise<User> {
    return await this.userService.findById(userId)
  }

  // REGISTER
  @Mutation(() => UserAuthResponse)
  async register(@Arg("data") data: RegisterInput): Promise<UserAuthResponse> {
    const user = await this.userService.create(data)
    const token = await createToken(user.id)
    return { user, token }
  }

  // LOGIN
  @Mutation(() => UserAuthResponse)
  async login(@Arg("data") data: LoginInput): Promise<UserAuthResponse> {
    const user = await this.userService.login(data)
    const token = await createToken(user.id)
    return { user, token }
  }

  // UPDATE USER
  @Authorized()
  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("data") data: UpdateInput,
    @Ctx() { userId }: ResolverContext,
  ): Promise<User> {
    return this.userService.update(userId, data)
  }

  // LOGOUT
  @Mutation(() => Boolean)
  async logout(): Promise<boolean> {
    return true
  }
}
