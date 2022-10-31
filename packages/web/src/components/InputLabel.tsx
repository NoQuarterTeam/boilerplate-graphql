import * as React from "react"
import type { FormLabelProps} from "@chakra-ui/react";
import { FormLabel, Text, useColorModeValue } from "@chakra-ui/react"

interface Props extends Omit<FormLabelProps, "children"> {
  name?: string
  label?: string
  subLabel?: string
}

export function InputLabel({ subLabel, ...props }: Props) {
  const subLabelColor = useColorModeValue("gray.400", "gray.300")
  if (!props.label) return null

  return (
    <FormLabel htmlFor={props.name} {...props} fontSize="sm" mb="1px">
      {props.label}
      {subLabel && (
        <Text ml={2} as="span" fontSize="xs" color={subLabelColor}>
          {subLabel}
        </Text>
      )}
    </FormLabel>
  )
}
