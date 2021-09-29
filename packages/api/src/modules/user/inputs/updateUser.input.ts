import { IsNotEmpty, MinLength } from "class-validator"
import { Field, InputType } from "type-graphql"

import { User } from "@generated"

@InputType()
export class UpdateUserInput implements Partial<User> {
  @IsNotEmpty()
  @Field({ nullable: true })
  firstName?: string

  @IsNotEmpty()
  @Field({ nullable: true })
  lastName?: string

  @IsNotEmpty()
  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  avatar?: string

  @Field({ nullable: true })
  bio?: string

  @MinLength(8)
  @IsNotEmpty()
  @Field({ nullable: true })
  password?: string
}
