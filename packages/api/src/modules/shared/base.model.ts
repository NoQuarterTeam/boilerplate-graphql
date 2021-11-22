import { Field, ObjectType } from "type-graphql"

@ObjectType()
export abstract class BaseModel {
  @Field() id: string
  @Field() createdAt: Date
  @Field() updatedAt: Date
}
