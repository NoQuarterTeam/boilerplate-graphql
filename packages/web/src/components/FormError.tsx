import React from "react"
import {
  FormControl,
  FormErrorMessage,
  FormControlProps,
} from "@chakra-ui/core"
import { useFormContext, FormContextValues } from "react-hook-form"

interface Props extends FormControlProps {
  error?: string
}
export const FormError: React.FC<Props> = props => {
  const { appError } = useFormContext() as FormContextValues<
    Record<string, any>
  > & { appError?: string }
  return (
    <FormControl isInvalid={!!appError || !!props.error} mb={4} {...props}>
      <FormErrorMessage>{appError || props.error}</FormErrorMessage>
    </FormControl>
  )
}
