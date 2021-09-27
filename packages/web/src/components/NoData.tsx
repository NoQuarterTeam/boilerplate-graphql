import * as React from "react"
import { FiAlertTriangle } from "react-icons/fi"
import { Box, FlexProps, HStack, Text } from "@chakra-ui/react"

interface Props extends FlexProps {
  children: React.ReactNode
}
export function NoData(props: Props) {
  return (
    <HStack
      p={3}
      px={4}
      border="1px solid"
      borderColor="gray.200"
      borderRadius={5}
      spacing={4}
      align="center"
    >
      <Box as={FiAlertTriangle} color="gray.500" />
      <Text color="gray.500">{props.children}</Text>
    </HStack>
  )
}
