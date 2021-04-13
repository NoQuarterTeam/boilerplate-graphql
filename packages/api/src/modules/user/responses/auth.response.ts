import { User } from "@generated"
import { ObjectType, Field } from "type-graphql"

@ObjectType()
export class AuthResponse {
  @Field()
  user: User

  @Field()
  token: string
}
