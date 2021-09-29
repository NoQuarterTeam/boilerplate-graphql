import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { Inject, Service } from "typedi"

import { S3BulkSignedUrlInput } from "./inputs/s3BulkSignedUrl.input"
import { S3SignedUrlInput } from "./inputs/s3SignedUrl.input"
import { SignedResponse } from "./response/signed.response"
import { S3Service } from "./s3.service"

@Service()
@Resolver()
export default class S3Resolver {
  @Inject(() => S3Service)
  s3Service: S3Service

  // GET SIGNED S3 URL FOR GET
  @Query(() => String, { nullable: true })
  getSignedS3UrlForGet(@Arg("key") key: string): string {
    return this.s3Service.getSignedUrlForGet(key)
  }

  // GET SIGNED S3 URL FOR PUT
  @Mutation(() => SignedResponse, { nullable: true })
  getSignedS3UrlForPut(
    @Arg("data")
    data: S3SignedUrlInput,
  ): SignedResponse {
    return this.s3Service.getSignedUrlForPut(data)
  }

  // GET BULK SIGNED S3 URL FOR PUT
  @Mutation(() => [SignedResponse], { nullable: true })
  getBulkSignedS3UrlForPut(
    @Arg("data")
    data: S3BulkSignedUrlInput,
  ): SignedResponse[] {
    return this.s3Service.getBulkSignedUrlForPut(data)
  }
}
