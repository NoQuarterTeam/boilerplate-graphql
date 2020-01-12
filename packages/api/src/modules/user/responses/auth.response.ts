import { User } from "../user.entity"
import { ObjectType, Field } from "type-graphql"

@ObjectType()
export class AuthResponse {
  @Field()
  user: User

  @Field()
  token: string
}
