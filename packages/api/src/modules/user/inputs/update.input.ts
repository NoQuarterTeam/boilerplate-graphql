import { InputType, Field } from "type-graphql"
import { User } from "../user.entity"

@InputType()
export class UpdateInput implements Partial<User> {
  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  password?: string

  @Field({ nullable: true })
  avatar?: string

  @Field({ nullable: true })
  houseId?: string
}
