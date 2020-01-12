import { InputType, Field } from "type-graphql"
import { User } from "../user.entity"

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string

  @Field()
  password: string
}
