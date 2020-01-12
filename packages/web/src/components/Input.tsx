import React from "react"
import {
  FormLabel,
  Input as CInput,
  InputProps,
  FormControl,
} from "@chakra-ui/core"
import { useFormContext, FieldError } from "react-hook-form"
import { InputError } from "./InputError"

interface Props extends InputProps {
  name: string
  label: string
}

export const Input = ({ label, ...props }: Props) => {
  const { register, errors } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string
  return (
    <FormControl isInvalid={!!fieldError} mb={4} isRequired={props.isRequired}>
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <CInput ref={register} mb={0} variant="filled" {...props} />
      <InputError error={fieldError} />
    </FormControl>
  )
}
