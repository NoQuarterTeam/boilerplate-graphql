import * as React from "react"
import { FieldError, useFormContext } from "react-hook-form"
import { FormControl, Textarea as CTextarea, TextareaProps } from "@chakra-ui/react"

import { InputError } from "./InputError"
import { InputLabel } from "./InputLabel"

interface Props extends TextareaProps {
  name: string
  label: string
  subLabel?: string
}

export const Textarea = ({ label, subLabel, ...props }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string

  return (
    <FormControl isInvalid={!!fieldError} isRequired={props.isRequired}>
      <InputLabel label={label} subLabel={subLabel} name={props.name} />
      <CTextarea {...register(props.name)} mb={0} variant="outline" bg="transparent" size="sm" {...props} />
      <InputError error={fieldError} />
    </FormControl>
  )
}
