import { S3 } from "aws-sdk/clients/all"

import { S3_CONFIG } from "./config"

// AWS
export const s3 = new S3(S3_CONFIG)
