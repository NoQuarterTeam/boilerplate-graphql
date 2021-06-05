import * as React from "react"
import {
  Flex,
  Box,
  Link,
  Stack,
  useColorModeValue,
  IconButton,
  useColorMode,
  Button,
  Center,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { BiSun, BiMoon } from "react-icons/bi"
import { useLogout } from "@admin/lib/hooks/useLogout"

interface Props {
  children: React.ReactNode
}
export function Layout(props: Props) {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === "dark"
  const bg = useColorModeValue("gray.50", "gray.800")

  const logout = useLogout()

  return (
    <Flex w="100vw" h="100vh" overflow="hidden">
      <Flex flexDir="column" justify="space-between" w={200} p={8} h="100vh" bg={bg}>
        <Stack>
          <Link as={NextLink} href="/">
            Home
          </Link>
          <Link as={NextLink} href="/users">
            Users
          </Link>
        </Stack>
        <Stack>
          <Center>
            <IconButton
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              variant="ghost"
              onClick={toggleColorMode}
              icon={<Box as={isDark ? BiSun : BiMoon} boxSize="20px" />}
            />
          </Center>
          <Button variant="outline" onClick={() => logout()}>
            Logout
          </Button>
        </Stack>
      </Flex>
      <Box w="calc(100vw - 200px)" px={10} py={8} overflow="scroll">
        {props.children}
      </Box>
    </Flex>
  )
}
