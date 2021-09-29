import * as React from "react"
import { FieldError, useFormContext } from "react-hook-form"
import { FormControl, Input as CInput, InputProps } from "@chakra-ui/react"

import { InputError } from "./InputError"
import { InputLabel } from "./InputLabel"

interface Props extends InputProps {
  name: string
  label?: string
  subLabel?: string
}

export const Input = ({ label, subLabel, ...props }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string
  return (
    <FormControl isInvalid={!!fieldError} isRequired={props.isRequired}>
      <InputLabel label={label} subLabel={subLabel} name={props.name} />
      <CInput {...register(props.name)} mb={0} {...props} />
      <InputError error={fieldError} />
    </FormControl>
  )
}
