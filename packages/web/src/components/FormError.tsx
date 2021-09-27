import * as React from "react"
import { useFormContext, UseFormReturn } from "react-hook-form"
import { FormControl, FormErrorMessage } from "@chakra-ui/react"

interface Props {
  error?: string
}
export const FormError: React.FC<Props> = (props) => {
  const { appError } = useFormContext() as UseFormReturn<Record<string, any>> & {
    appError?: string
  }
  if (!appError && !props.error) return null
  return (
    <FormControl isInvalid={!!appError || !!props.error}>
      <FormErrorMessage>{appError || props.error}</FormErrorMessage>
    </FormControl>
  )
}
