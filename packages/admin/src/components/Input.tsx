import * as React from "react"
import { Flex, Input as CInput, InputProps, FormControl } from "@chakra-ui/react"
import { useFormContext, FieldError } from "react-hook-form"
import { InlineInputError, InputError } from "./InputError"
import { InputLabel, InlineInputLabel } from "./InputLabel"

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

export const InlineInput = ({ label, subLabel, ...props }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string
  return (
    <FormControl isInvalid={!!fieldError} isRequired={props.isRequired}>
      <Flex align="center">
        <InlineInputLabel label={label} subLabel={subLabel} name={props.name} />
        <CInput {...register(props.name)} mb={0} variant="outline" bg="transparent" size="sm" {...props} />
      </Flex>
      <InlineInputError error={fieldError} />
    </FormControl>
  )
}
