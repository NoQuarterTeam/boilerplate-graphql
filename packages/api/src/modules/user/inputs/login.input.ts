import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"

import { User } from "../user.model"

@InputType()
export class LoginInput implements Partial<User> {
  @IsNotEmpty()
  @Field()
  email: string

  @IsNotEmpty()
  @Field()
  password: string
}
