import * as React from "react"
import { gql } from "@apollo/client"

import { useGetBulkSignedUrlForPutMutation, useGetSignedUrlForPutMutation } from "../graphql"
import { formatFileName } from "../helpers/utils"
import { useMutationHandler } from "./useMutationHandler"
import { useToast } from "./useToast"

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
): [(file: File, lazyProps?: Props) => Promise<UploadFile | void>, { loading: boolean }] {
  const [loading, setLoading] = React.useState(false)
  const [getS3SignedRequest] = useGetSignedUrlForPutMutation()
  const toast = useToast()
  const handler = useMutationHandler()

  async function upload(file: File, lazyProps?: Props) {
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
    const res = await handler(() => getS3SignedRequest({ variables: { data: { key, fileType: file.type } } }))
    if (!res || !res.data || !res.data.getSignedS3UrlForPut) {
      setLoading(false)
      return toast({
        status: "error",
        description: "Error uploading file, please try again",
      })
    }
    await fetch(res.data.getSignedS3UrlForPut.uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    }).catch(() => {
      toast({ status: "error", description: "Error uploading file" })
    })
    setLoading(false)
    return {
      fileUrl: res.data.getSignedS3UrlForPut.url,
      fileKey: key,
      fileName: file.name,
      fileType: file.type || null,
    }
  }
  return [upload, { loading }]
}

export const GET_BULK_SIGNED_URL_FOR_PUT = gql`
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
): [(files: File[], lazyProps?: Props) => Promise<BulkUploadFile[] | void>, { loading: boolean }] {
  const [loading, setLoading] = React.useState(false)
  const [getBulkSigned] = useGetBulkSignedUrlForPutMutation()
  const toast = useToast()
  const handler = useMutationHandler()

  async function upload(files: File[], lazyProps?: Props): Promise<BulkUploadFile[] | void> {
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
    if (!res || !res.data || !res.data.getBulkSignedS3UrlForPut) {
      setLoading(false)

      return toast({
        status: "error",
        description: "Error uploading image, please try again",
      })
    }

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
    } catch (err) {
      setLoading(false)
      return toast({ status: "error", description: "Error uploading files" })
    }

    setLoading(false)
    return fileData.map((f) => ({
      fileKey: f.fileKey,
      fileName: f.fileName,
      fileType: f.fileType,
    }))
  }
  return [upload, { loading }]
}
