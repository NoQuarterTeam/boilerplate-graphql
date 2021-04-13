import * as React from "react"
import Link from "next/link"
import { Box, Center, Text, Button, Heading, HStack, IconButton, useColorMode, Stack } from "@chakra-ui/react"
import Head from "next/head"
import { BiMoon, BiSun } from "react-icons/bi"

import { useMe } from "components/providers/MeProvider"
import { useLogout } from "lib/hooks/useLogout"
import { ButtonGroup } from "components/ButtonGroup"

export default function Home() {
  const me = useMe()
  const logout = useLogout()
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === "dark"
  return (
    <Box>
      <Head>
        <title>Fullstack boilerplate</title>
      </Head>

      <Center minH="100vh">
        <Box>
          <Heading mb={2}>Welcome to the Fullstack boilerplate</Heading>
          {me ? (
            <Stack>
              <Text fontSize="2rem">Hello, {me.firstName}!</Text>
              <ButtonGroup>
                <Button variant="outline" onClick={() => logout()}>
                  Logout
                </Button>
              </ButtonGroup>
            </Stack>
          ) : (
            <HStack>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </HStack>
          )}
        </Box>
        <Box pos="absolute" top={4} right={4}>
          <IconButton
            borderRadius="full"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            variant="ghost"
            onClick={toggleColorMode}
            icon={<Box as={isDark ? BiSun : BiMoon} boxSize="20px" />}
          />
        </Box>
      </Center>
    </Box>
  )
}
