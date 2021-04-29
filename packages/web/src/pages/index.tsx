import * as React from "react"
import Link from "next/link"
import {
  Box,
  Center,
  Text,
  Button,
  Heading,
  HStack,
  IconButton,
  useColorMode,
  Stack,
  Spinner,
} from "@chakra-ui/react"
import Head from "next/head"
import { BiMoon, BiSun } from "react-icons/bi"

import { useLogout } from "lib/hooks/useLogout"
import { ButtonGroup } from "components/ButtonGroup"
import { useMe } from "lib/hooks/useMe"
import { UsersList } from "components/UsersList"

export default function Home() {
  const { me, loading } = useMe()
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
          {loading ? (
            <Center>
              <Spinner />
            </Center>
          ) : me ? (
            <Stack>
              <ButtonGroup>
                <Text fontSize="2rem">Hello, {me.firstName}!</Text>
                <Button size="sm" variant="outline" onClick={() => logout()}>
                  Logout
                </Button>
              </ButtonGroup>
              <UsersList />
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
