import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class RefreshTokenResponse {
  @Field()
  refreshToken: string

  @Field()
  token: string
}
