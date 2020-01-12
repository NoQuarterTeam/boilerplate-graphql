import React from "react"
import { useFormContext, FormContext } from "react-hook-form"
import { FormProps } from "react-hook-form/dist/contextTypes"

import { useToast } from "../lib/hooks/useToast"

interface FormContainerProps {
  onSubmit?: (values: any) => Promise<any> | any
  onBlur?: (values: any) => Promise<any> | any
}

const FormContainer: React.FC<FormContainerProps> = props => {
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
        description: "Have you lost internet connection?",
        status: "error",
      })
    }
  }

  return (
    <form
      style={{ width: "100%" }}
      {...(props.onSubmit && { onSubmit: handleSubmit(onSubmit) })}
      {...(props.onBlur && { onBlur: handleSubmit(onSubmit) })}
    >
      {props.children}
    </form>
  )
}

interface Props<T> extends FormProps<T>, FormContainerProps {}

export function Form<T>({ onSubmit, onBlur, ...props }: Props<T>) {
  return (
    <FormContext {...props}>
      <FormContainer onSubmit={onSubmit} onBlur={onBlur}>
        {props.children}
      </FormContainer>
    </FormContext>
  )
}
