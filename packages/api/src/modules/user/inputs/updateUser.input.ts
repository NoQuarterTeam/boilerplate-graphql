import { InputType, Field } from "type-graphql"
import { IsNotEmpty, MinLength } from "class-validator"
import { User } from "@prisma/client"

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

  @IsNotEmpty()
  @Field({ nullable: true })
  avatarKey?: string

  @MinLength(8)
  @IsNotEmpty()
  @Field({ nullable: true })
  password?: string
}
