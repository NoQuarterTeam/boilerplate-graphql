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
  Text,
  Icon,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { BiSun, BiMoon } from "react-icons/bi"
import { CgExternal, CgHome, CgUser } from "react-icons/cg"

import { useLogout } from "lib/hooks/useLogout"

interface Props {
  children: React.ReactNode
}
export function AdminLayout(props: Props) {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === "dark"

  const logout = useLogout()

  return (
    <Flex w="100vw" h="100vh" overflow="hidden">
      <Flex
        flexDir="column"
        justify="space-between"
        w={{ base: "70px", md: "200px" }}
        p={{ base: 4, md: 8 }}
        py={8}
        h="100vh"
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px solid"
        borderColor={useColorModeValue("gray.100", "gray.900")}
      >
        <Stack spacing={4}>
          <SidebarLink href="/admin" icon={<Box boxSize="16px" as={CgHome} />}>
            Home
          </SidebarLink>
          <SidebarLink href="/admin/users" icon={<Box boxSize="18px" as={CgUser} />}>
            Users
          </SidebarLink>
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
          <Button variant="outline" onClick={() => logout()} size="sm">
            <Icon boxSize="20px" as={CgExternal} mr={{ base: 0, md: 2 }} />
            <Text d={{ base: "none", md: "block" }}>Logout</Text>
          </Button>
        </Stack>
      </Flex>
      <Box
        w={{ base: "calc(100vw - 70px)", md: "calc(100vw - 200px)" }}
        px={{ base: 4, md: 10 }}
        py={8}
        overflow="scroll"
      >
        {props.children}
      </Box>
    </Flex>
  )
}

interface SidebarLinkProps extends LinkProps {
  href: string
  icon: React.ReactNode
  children: string
}

function SidebarLink({ href, icon, ...props }: SidebarLinkProps) {
  const router = useRouter()
  const isActive = router.asPath === href
  return (
    <NextLink passHref href={href}>
      <Link
        display="flex"
        alignItems="center"
        justifyContent={{ base: "center", md: "flex-start" }}
        fontWeight="semibold"
        color={isActive ? "purple.500" : undefined}
        {...props}
      >
        <Center w="26px">{icon}</Center>
        <Text ml={2} d={{ base: "none", md: "block" }}>
          {props.children}
        </Text>
      </Link>
    </NextLink>
  )
}
