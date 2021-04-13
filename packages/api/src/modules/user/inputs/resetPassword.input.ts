import { InputType, Field } from "type-graphql"
import { IsNotEmpty } from "class-validator"
import { User } from "../user.entity"

@InputType()
export class ResetPasswordInput implements Partial<User> {
  @IsNotEmpty()
  @Field()
  password: string

  @IsNotEmpty()
  @Field()
  token: string
}
