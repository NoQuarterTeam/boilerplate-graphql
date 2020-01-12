import React from "react"
import { FieldError } from "react-hook-form"
import { FormErrorMessage } from "@chakra-ui/core"

interface Props {
  error: FieldError | string
}

export const InputError: React.FC<Props> = props => {
  if (!props.error) return null
  return (
    <>
      {typeof props.error === "string" ? (
        <FormErrorMessage>{props.error}</FormErrorMessage>
      ) : (
        props.error.types &&
        Object.values(props.error.types).map((error, i) => (
          <FormErrorMessage key={i}>{error}</FormErrorMessage>
        ))
      )}
    </>
  )
}
