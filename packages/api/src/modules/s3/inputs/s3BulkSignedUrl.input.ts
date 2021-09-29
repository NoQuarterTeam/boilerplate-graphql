import { Field, InputType } from "type-graphql"

import { S3SignedUrlInput } from "./s3SignedUrl.input"

@InputType()
export class S3BulkSignedUrlInput {
  @Field(() => [S3SignedUrlInput])
  files: S3SignedUrlInput[]
}
