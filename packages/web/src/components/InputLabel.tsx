import * as React from "react"
import { FormLabel, Text, FormLabelProps, useColorModeValue } from "@chakra-ui/react"

interface Props extends Omit<FormLabelProps, "children"> {
  name?: string
  label?: string
  subLabel?: string
}

export const InputLabel: React.FC<Props> = ({ subLabel, ...props }) => {
  const subLabelColor = useColorModeValue("gray.400", "gray.300")
  if (!props.label) return null

  return (
    <FormLabel htmlFor={props.name} {...props} fontSize="0.9rem">
      {props.label}
      {subLabel && (
        <Text ml={2} as="span" fontSize="0.8rem" color={subLabelColor}>
          {subLabel}
        </Text>
      )}
    </FormLabel>
  )
}

export const InlineInputLabel: React.FC<Props> = ({ subLabel, ...props }) => {
  const subLabelColor = useColorModeValue("gray.400", "gray.300")

  if (!props.label) return null
  return (
    <FormLabel
      lineHeight="14px"
      htmlFor={props.name}
      fontWeight={400}
      fontSize={{ base: "0.8rem", md: "0.9rem" }}
      mb={0}
      mr={2}
      minW={{ base: 70, md: 100 }}
      {...props}
    >
      {props.label}
      {subLabel && (
        <Text fontSize="0.6rem" color={subLabelColor}>
          {subLabel}
        </Text>
      )}
    </FormLabel>
  )
}
