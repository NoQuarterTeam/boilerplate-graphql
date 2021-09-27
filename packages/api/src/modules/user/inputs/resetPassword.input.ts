import { User } from "@prisma/client"
import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class ResetPasswordInput implements Partial<User> {
  @IsNotEmpty()
  @Field()
  password: string

  @IsNotEmpty()
  @Field()
  token: string
}
