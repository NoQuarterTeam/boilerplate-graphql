import * as React from "react"
import type { UseFormReturn } from "react-hook-form";
import { useFormContext } from "react-hook-form"
import { FormControl, FormErrorMessage } from "@chakra-ui/react"

interface Props {
  error?: string
}
export function FormError(props: Props) {
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
