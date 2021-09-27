import * as React from "react"
import { FormProvider, useFormContext, UseFormReturn } from "react-hook-form"
import { Button, IButtonProps } from "native-base"

export const Form: React.FC<UseFormReturn<any>> = ({ children, ...props }) => {
  return <FormProvider {...props}>{children}</FormProvider>
}

interface Props extends Omit<IButtonProps, "onPress"> {
  onPress: (data: any) => any
}

export const FormButton: React.FC<Props> = ({ children, onPress, ...props }) => {
  const { handleSubmit, formState } = useFormContext()
  return (
    <Button
      isLoading={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      {...props}
      onPress={handleSubmit(onPress)}
    >
      {children}
    </Button>
  )
}
