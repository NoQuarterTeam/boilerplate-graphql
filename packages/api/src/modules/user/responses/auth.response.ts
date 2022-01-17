import { Field, ObjectType } from "type-graphql"

import { User } from "../user.model"
import { RefreshTokenResponse } from "./refreshToken.response"

@ObjectType()
export class AuthResponse extends RefreshTokenResponse {
  @Field()
  user: User
}
