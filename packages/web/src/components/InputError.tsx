import * as React from "react"
import type { DeepRequired, FieldError, FieldErrorsImpl, Merge } from "react-hook-form"
import { FormErrorMessage } from "@chakra-ui/react"

interface Props {
  error: Merge<FieldError, FieldErrorsImpl<DeepRequired<any>>> | undefined
}

export const InputError: React.FC<Props> = (props) => {
  if (!props.error) return null
  return (
    <>
      {typeof props.error === "string" ? (
        <FormErrorMessage>{props.error}</FormErrorMessage>
      ) : props.error.message ? (
        <FormErrorMessage>{props.error.message}</FormErrorMessage>
      ) : (
        props.error.types &&
        Object.values(props.error.types).map((error, i) => (
          <FormErrorMessage key={i}>{error}</FormErrorMessage>
        ))
      )}
    </>
  )
}
