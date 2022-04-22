import { S3 } from "aws-sdk/clients/all"

// S3
const S3_CONFIG = {
  signatureVersion: "v4",
  region: "eu-central-1",
}

// AWS
export const s3 = new S3(S3_CONFIG)
