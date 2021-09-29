import * as React from "react"
import { gql } from "@apollo/client"

import { useGetBulkSignedUrlForPutMutation, useGetSignedUrlForPutMutation } from "../graphql"
import { formatFileName } from "../helpers/utils"
import { useMutationHandler } from "./useMutationHandler"

const _ = gql`
  mutation GetSignedUrlForPut($data: S3SignedUrlInput!) {
    getSignedS3UrlForPut(data: $data) {
      url
      uploadUrl
    }
  }
`

interface Props {
  path?: string
}

export type UploadFile = {
  fileUrl: string
  fileKey: string
  fileName: string
  fileType: string | null
}
export function useS3Upload(
  props?: Props,
): [(file: File, lazyProps?: Props) => Promise<UploadFile>, { loading: boolean }] {
  const [loading, setLoading] = React.useState(false)
  const [getS3SignedRequest] = useGetSignedUrlForPutMutation()
  const handler = useMutationHandler()

  async function upload(file: File, lazyProps?: Props) {
    try {
      setLoading(true)
      let parsedKey = props?.path || lazyProps?.path || "/unknown"
      if (parsedKey[parsedKey.length - 1] === "/") {
        parsedKey = parsedKey.slice(0, -1)
      }
      if (parsedKey[0] === "/") {
        parsedKey = parsedKey.substr(1)
      }
      const formattedName = formatFileName(file.name)
      const key = parsedKey + "/" + formattedName
      const res = await handler(() =>
        getS3SignedRequest({ variables: { data: { key, fileType: file.type } } }),
      )
      if (!res || !res.data || !res.data.getSignedS3UrlForPut) throw new Error("Error fetching signed url")
      await fetch(res.data.getSignedS3UrlForPut.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      })
      setLoading(false)
      return {
        fileUrl: res.data.getSignedS3UrlForPut.url,
        fileKey: key,
        fileName: file.name,
        fileType: file.type || null,
      }
    } catch (error) {
      setLoading(false)
      throw error
    }
  }
  return [upload, { loading }]
}

const __ = gql`
  mutation GetBulkSignedUrlForPut($data: S3BulkSignedUrlInput!) {
    getBulkSignedS3UrlForPut(data: $data) {
      url
      uploadUrl
      key
    }
  }
`

export type BulkUploadFile = {
  fileKey: string
  fileName: string
  fileType: string | null
}

export function useS3BulkUpload(
  props: Props,
): [(files: File[], lazyProps?: Props) => Promise<BulkUploadFile[]>, { loading: boolean }] {
  const [loading, setLoading] = React.useState(false)
  const [getBulkSigned] = useGetBulkSignedUrlForPutMutation()
  const handler = useMutationHandler()

  async function upload(files: File[], lazyProps?: Props): Promise<BulkUploadFile[]> {
    setLoading(true)
    let parsedKey = props?.path || lazyProps?.path || "/unknown"
    if (parsedKey[parsedKey.length - 1] === "/") {
      parsedKey = parsedKey.slice(0, -1)
    }
    if (parsedKey[0] === "/") {
      parsedKey = parsedKey.substr(1)
    }
    const fileData = files.map((file) => ({
      file,
      fileType: file.type,
      fileName: file.name,
      fileKey: parsedKey + "/" + formatFileName(file.name),
    }))
    const res = await handler(() =>
      getBulkSigned({
        variables: {
          data: { files: fileData.map((file) => ({ key: file.fileKey, fileType: file.fileType })) },
        },
      }),
    )
    if (!res || !res.data || !res.data.getBulkSignedS3UrlForPut) throw new Error("Error fetching signed url")

    try {
      await Promise.all(
        res.data.getBulkSignedS3UrlForPut.map((request) => {
          const file = fileData.find((d) => d.fileKey === request.key)
          if (!file) return null
          return fetch(request.uploadUrl, {
            method: "PUT",
            headers: { "Content-Type": file.fileType },
            body: file.file,
          })
        }),
      )
      setLoading(false)
      return fileData.map((f) => ({
        fileKey: f.fileKey,
        fileName: f.fileName,
        fileType: f.fileType,
      }))
    } catch (error) {
      setLoading(false)
      throw error
    }
  }
  return [upload, { loading }]
}
