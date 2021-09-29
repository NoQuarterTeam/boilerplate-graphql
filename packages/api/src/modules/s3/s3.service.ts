import * as Sentry from "@sentry/node"
import { Service } from "typedi"

import { AWS_S3_BUCKET, S3_URL } from "../../lib/config"
import { s3 } from "../../lib/s3"
import { S3BulkSignedUrlInput } from "./inputs/s3BulkSignedUrl.input"
import { S3SignedUrlInput } from "./inputs/s3SignedUrl.input"
import { SignedResponse } from "./response/signed.response"

@Service()
export class S3Service {
  private readonly bucket: string
  constructor() {
    this.bucket = AWS_S3_BUCKET
  }
  getSignedUrlForGet(key: string): string {
    // TODO: use signing for everything?
    return S3_URL + key
  }

  getSignedUrlForPut(data: S3SignedUrlInput): SignedResponse {
    const s3Params = {
      Bucket: this.bucket,
      Key: data.key,
      Expires: 60,
      ContentType: data.fileType,
      ACL: "public-read",
    }
    return { uploadUrl: s3.getSignedUrl("putObject", s3Params), key: data.key, url: S3_URL + data.key }
  }

  getBulkSignedUrlForPut(data: S3BulkSignedUrlInput): SignedResponse[] {
    const urls = data.files.map((file) => {
      const s3Params = {
        Bucket: this.bucket,
        Key: file.key,
        Expires: 60,
        ContentType: file.fileType,
        ACL: "public-read",
      }
      return { uploadUrl: s3.getSignedUrl("putObject", s3Params), url: S3_URL + file.key, key: file.key }
    })
    return urls
  }

  async bulkDestroy(keys: string[]) {
    if (keys.length === 0) return true
    const objects = keys.map((key) => ({ Key: key }))
    try {
      await s3
        .deleteObjects({
          Bucket: this.bucket,
          Delete: { Objects: objects },
        })
        .promise()
    } catch (err) {
      Sentry.captureException(err)
    } finally {
      return true
    }
  }

  async destroy(key: string) {
    try {
      await s3.deleteObject({ Bucket: this.bucket, Key: key }).promise()
    } catch (err) {
      Sentry.captureException(err)
    } finally {
      return true
    }
  }

  async upload(data: { key: string; body: string | Buffer | Uint8Array | Blob; contentType: string }) {
    try {
      await s3
        .putObject({
          Key: data.key,
          Bucket: this.bucket,
          Body: data.body,
          ACL: "public-read",
          ContentType: data.contentType,
        })
        .promise()
    } catch (err) {
      Sentry.captureException(err)
    } finally {
      return true
    }
  }
}
