"use client"
import { Box, Center, Heading, Link, Text, VStack } from "@chakra-ui/react"
import NextLink from "next/link"

import { useMe } from "lib/hooks/useMe"
import { Limiter } from "components/Limiter"

export default function Home() {
  const { me } = useMe()

  return (
    <Box>
      <Limiter pt={20}>
        <Center flexDir="column">
          <VStack>
            <Heading as="h1" textAlign="center">
              Welcome to the Boilerplate
            </Heading>
            {me && (
              <Heading as="h2" fontSize="2xl">
                Hello, {me.firstName}!
              </Heading>
            )}
            <Text>
              Built by{" "}
              <Link
                as={NextLink}
                href="https://www.noquarter.co"
                _hover={{ textDecor: "underline" }}
                target="_blank"
                color="purple.500"
              >
                No Quarter
              </Link>
            </Text>
          </VStack>
        </Center>
      </Limiter>
    </Box>
  )
}
