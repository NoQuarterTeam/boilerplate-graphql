import { InputType, Field } from "type-graphql"
import { User } from "../user.entity"

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  email: string

  @Field()
  password: string
}
