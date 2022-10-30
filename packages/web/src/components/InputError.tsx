import * as React from "react"
import type { FieldError, FieldErrors, Merge } from "react-hook-form"
import { FormErrorMessage } from "@chakra-ui/react"

interface Props {
  error?: FieldError | Merge<FieldError, FieldErrors<any>> | string
}

export function InputError(props: Props) {
  if (!props.error) return null
  return (
    <>
      {typeof props.error === "string" ? (
        <FormErrorMessage>{props.error}</FormErrorMessage>
      ) : props.error.message ? (
        <FormErrorMessage>{props.error.message as string}</FormErrorMessage>
      ) : (
        props.error.types &&
        Object.values(props.error.types).map((error, i) => (
          <FormErrorMessage key={i}>{error}</FormErrorMessage>
        ))
      )}
    </>
  )
}
