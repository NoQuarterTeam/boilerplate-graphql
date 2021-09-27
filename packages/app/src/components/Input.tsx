import * as React from "react"
import { FieldError, useFormContext } from "react-hook-form"
import { TextInputProps } from "react-native"
import { Box, IBoxProps, Input as NInput, ITextProps, Text } from "native-base"

import { InputError } from "./InputError"

interface Props extends Omit<TextInputProps, "onChangeText" | "value"> {
  name: string
  label?: string
  labelStyle?: ITextProps
  containerStyle?: IBoxProps
  parser?: (text: string) => string
}

export const Input = ({ label, name, labelStyle, containerStyle, parser, ...props }: Props) => {
  const {
    formState: { errors },
    watch,
    register,
    setValue,
    unregister,
  } = useFormContext()

  const fieldError = errors?.[name] as FieldError | string

  const handleUpdate = (text: string) => {
    setValue(name, parser ? parser(text) : text)
  }

  React.useEffect(() => {
    register(name)
    return () => unregister(name)
  }, [register, unregister, name])

  const value = watch(name) as string
  return (
    <Box w="100%" {...containerStyle}>
      {label && (
        <Text mb={2} fontSize="md" fontWeight={500} {...labelStyle}>
          {label}
        </Text>
      )}
      <NInput value={value} onChangeText={handleUpdate} mb={2} {...props} />
      <InputError error={fieldError} />
    </Box>
  )
}
