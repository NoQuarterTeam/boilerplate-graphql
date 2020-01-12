import { ObjectType, Field } from "type-graphql"

@ObjectType()
export class FindWithArgsResponse {
  @Field()
  count: number
}
