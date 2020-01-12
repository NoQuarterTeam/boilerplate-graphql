import React from "react"
import { Flex } from "@chakra-ui/core"

export const Page: React.FC = ({ children }) => {
  return (
    <Flex h="100vh" w="100vw" align="center" justify="center">
      {children}
    </Flex>
  )
}
