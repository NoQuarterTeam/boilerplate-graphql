import { User } from "./user.entity"
import { ObjectType, Field } from "type-graphql"

@ObjectType()
export class UserAuthResponse {
  @Field()
  user: User

  @Field()
  token: string
}
