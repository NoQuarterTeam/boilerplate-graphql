import * as React from "react"
import { FormProvider, useFormContext, UseFormReturn } from "react-hook-form"
import { Box } from "@chakra-ui/react"

import { useToast } from "lib/hooks/useToast"

interface FormContainerProps {
  onSubmit?: (values: any) => Promise<any> | any
  onBlur?: (values: any) => Promise<any> | any
}

const FormContainer: React.FC<FormContainerProps> = (props) => {
  const toast = useToast()
  const { handleSubmit } = useFormContext()
  const onSubmit = async (values: any) => {
    try {
      if (props.onBlur) {
        return await props.onBlur(values)
      }
      if (props.onSubmit) {
        return await props.onSubmit(values)
      }
    } catch {
      toast({
        title: "Network error",
        description: "Something went wrong. We have been notified!",
        status: "error",
      })
      return
    }
  }

  return (
    <Box
      as="form"
      w="100%"
      {...(props.onSubmit && { onSubmit: handleSubmit(onSubmit) })}
      {...(props.onBlur && { onBlur: handleSubmit(onSubmit) })}
    >
      {props.children}
    </Box>
  )
}

interface Props<T> extends UseFormReturn<T>, FormContainerProps {
  children: React.ReactNode
}

export function Form<T>({ onSubmit, onBlur, ...props }: Props<T>) {
  return (
    <FormProvider {...props}>
      <FormContainer {...{ onSubmit, onBlur }}>{props.children}</FormContainer>
    </FormProvider>
  )
}
