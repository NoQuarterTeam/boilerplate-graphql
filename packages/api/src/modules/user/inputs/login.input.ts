import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"

import { User } from "@generated"

@InputType()
export class LoginInput implements Partial<User> {
  @IsNotEmpty()
  @Field()
  email: string

  @IsNotEmpty()
  @Field()
  password: string
}
