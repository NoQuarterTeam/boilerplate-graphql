import { Field, InputType } from "type-graphql"

@InputType()
export class S3SignedUrlInput {
  @Field()
  key: string

  @Field()
  fileType: string
}
