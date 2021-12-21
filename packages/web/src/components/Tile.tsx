import * as React from "react"
import { Box, BoxProps, Flex, FlexProps, Heading, HeadingProps, useColorModeValue } from "@chakra-ui/react"

export function Tile({ children, ...props }: BoxProps) {
  return (
    <Box
      w="100%"
      border="1px solid"
      borderColor={useColorModeValue("gray.100", "gray.700")}
      borderRadius="md"
      {...props}
    >
      {children}
    </Box>
  )
}

export function TileHeader({ children, ...props }: FlexProps) {
  return (
    <Flex px={{ base: 4, md: 6 }} py={4} pb={0} align="center" w="100%" justify="space-between" {...props}>
      {children}
    </Flex>
  )
}
export function TileHeading({ children, ...props }: HeadingProps) {
  return (
    <Heading as="h2" size="md" fontWeight="semibold" {...props}>
      {children}
    </Heading>
  )
}
export function TileBody({ children, ...props }: BoxProps) {
  return (
    <Box w="100%" px={{ base: 4, md: 6 }} py={4} {...props}>
      {children}
    </Box>
  )
}

export function TileFooter({ children, ...props }: BoxProps) {
  return (
    <Box
      borderTop="1px solid"
      borderColor={useColorModeValue("gray.100", "gray.700")}
      color={useColorModeValue("gray.700", "gray.400")}
      px={{ base: 4, md: 6 }}
      py={4}
      fontSize="sm"
      {...props}
    >
      {children}
    </Box>
  )
}
