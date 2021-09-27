import { Field, ObjectType } from "type-graphql"

import { User } from "@generated"

@ObjectType()
export class AuthResponse {
  @Field()
  user: User

  @Field()
  token: string
}
