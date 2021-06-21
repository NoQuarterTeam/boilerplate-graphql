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
  LinkProps,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { BiSun, BiMoon } from "react-icons/bi"

import { useLogout } from "lib/hooks/useLogout"

interface Props {
  children: React.ReactNode
}
export function Layout(props: Props) {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === "dark"

  const logout = useLogout()

  return (
    <Flex w="100vw" h="100vh" overflow="hidden">
      <Flex
        flexDir="column"
        justify="space-between"
        w={200}
        p={8}
        h="100vh"
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px solid"
        borderColor={useColorModeValue("gray.100", "gray.900")}
      >
        <Stack>
          <SidebarLink href="/">Home</SidebarLink>
          <SidebarLink href="/users">Users</SidebarLink>
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

interface SidebarLinkProps extends LinkProps {
  href: string
  children: string
}

function SidebarLink({ href, ...props }: SidebarLinkProps) {
  const router = useRouter()
  const isActive = router.asPath === href
  return (
    <NextLink passHref href={href}>
      <Link {...props} fontWeight="bold" color={isActive ? "purple.500" : undefined}>
        {props.children}
      </Link>
    </NextLink>
  )
}
