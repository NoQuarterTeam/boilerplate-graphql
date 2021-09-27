import * as React from "react"
import { FieldError } from "react-hook-form"
import { Stack, Text, WarningTwoIcon } from "native-base"

interface Props {
  error?: FieldError | string
}

export const InputError: React.FC<Props> = (props) => {
  if (!props.error) return null
  return (
    <Stack direction="row" space={2} alignItems="center">
      <WarningTwoIcon color="red.500" size="xs" />
      {typeof props.error === "string" ? (
        <Text color="red.500" fontWeight={400}>
          {props.error}
        </Text>
      ) : props.error.message ? (
        <Text color="red.500" fontWeight={400}>
          {props.error.message}
        </Text>
      ) : (
        props.error.types &&
        Object.values(props.error.types).map((error, i) => (
          <Text key={i} color="red.500" fontWeight={400}>
            {error}
          </Text>
        ))
      )}
    </Stack>
  )
}
