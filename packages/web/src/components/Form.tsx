import * as React from "react"
import type { FieldValues, UseFormReturn } from "react-hook-form"
import { FormProvider, useFormContext } from "react-hook-form"
import { Box } from "@chakra-ui/react"
import * as Sentry from "@sentry/nextjs"

import { useToast } from "lib/hooks/useToast"

interface FormContainerProps {
  onSubmit?: (values: any) => Promise<any> | any
  onBlur?: (values: any) => Promise<any> | any
  children?: React.ReactNode
}

function FormContainer(props: FormContainerProps) {
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
    } catch (e) {
      console.log(e)
      Sentry.captureException(e)
      toast({
        title: "Application error",
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

interface Props<T extends FieldValues> extends UseFormReturn<T>, FormContainerProps {
  children: React.ReactNode
  isDisabled?: boolean
}

export function Form<T extends FieldValues>({ onSubmit, onBlur, isDisabled, ...props }: Props<T>) {
  return (
    <FormProvider {...props}>
      <fieldset disabled={isDisabled}>
        <FormContainer {...{ onSubmit, onBlur }}>{props.children}</FormContainer>
      </fieldset>
    </FormProvider>
  )
}
