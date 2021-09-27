import { IsNotEmpty, Length } from "class-validator"
import { Field, InputType } from "type-graphql"

import { User } from "@generated"

@InputType()
export class RegisterInput implements Partial<User> {
  @IsNotEmpty()
  @Field()
  firstName: string

  @IsNotEmpty()
  @Field()
  lastName: string

  @IsNotEmpty()
  @Field()
  password: string

  @IsNotEmpty()
  @Length(8)
  @Field()
  email: string
}
