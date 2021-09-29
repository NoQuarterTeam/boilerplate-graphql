import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class SignedResponse {
  @Field()
  uploadUrl: string

  @Field()
  url: string

  @Field()
  key: string
}
