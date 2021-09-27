import * as React from "react"
import { FieldError, useFormContext } from "react-hook-form"
import { Flex, FormControl, Select as CSelect, SelectProps } from "@chakra-ui/react"

import { InlineInputError, InputError } from "./InputError"
import { InlineInputLabel, InputLabel } from "./InputLabel"

interface Props extends SelectProps {
  name: string
  options: any[]
  label?: string
  subLabel?: string
}

export const Select = ({ label, subLabel, placeholder, ...props }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string
  return (
    <FormControl isInvalid={!!fieldError} isRequired={props.isRequired}>
      <InputLabel label={label} subLabel={subLabel} name={props.name} />
      <CSelect {...register(props.name)} variant="filled" {...props} mb={0}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {props.options.map((option, index) => (
          <option
            key={index}
            value={typeof option === "string" || typeof option === "number" ? option : option.value}
          >
            {typeof option === "string" || typeof option === "number" ? option : option.label}
          </option>
        ))}
      </CSelect>
      <InputError error={fieldError} />
    </FormControl>
  )
}
export const InlineSelect = ({ label, subLabel, placeholder, ...props }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const fieldError = errors?.[props.name] as FieldError | string
  return (
    <FormControl isInvalid={!!fieldError} isRequired={props.isRequired}>
      <Flex align="center">
        <InlineInputLabel label={label} subLabel={subLabel} name={props.name} />

        <CSelect {...register(props.name)} variant="outline" {...props} mb={0} size="sm">
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {props.options.map((option, index) => (
            <option
              key={index}
              value={typeof option === "string" || typeof option === "number" ? option : option.value}
            >
              {typeof option === "string" || typeof option === "number" ? option : option.label}
            </option>
          ))}
        </CSelect>
      </Flex>
      <InlineInputError error={fieldError} />
    </FormControl>
  )
}
