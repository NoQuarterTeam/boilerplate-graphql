import * as React from "react"
import { BiMoon, BiSun } from "react-icons/bi"
import { CgExternal, CgUser } from "react-icons/cg"
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  IconButton,
  Link,
  LinkProps,
  Spinner,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { Role } from "lib/graphql"
import { useLogout } from "lib/hooks/useLogout"
import { useMe } from "lib/hooks/useMe"

interface Props {
  children: React.ReactNode
}
export function AdminLayout(props: Props) {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === "dark"

  const logout = useLogout()
  const { me, loading } = useMe()
  const router = useRouter()

  React.useEffect(() => {
    if (loading) return
    if (!me || me.role !== Role.Admin) {
      router.replace(`/`)
    }
  }, [loading, me, router])

  const bg = useColorModeValue("white", "gray.900")
  const borderColor = useColorModeValue("gray.100", "gray.900")
  if (loading || !me || me.role !== Role.Admin) {
    return (
      <Center minH="100vh">
        <Spinner />
      </Center>
    )
  }
  return (
    <Flex w="100vw" h="100vh" overflow="hidden">
      <Flex
        flexDir="column"
        justify="space-between"
        w={{ base: "70px", md: "200px" }}
        p={{ base: 4, md: 8 }}
        py={8}
        h="100vh"
        bg={bg}
        borderRight="1px solid"
        borderColor={borderColor}
      >
        <Stack spacing={4}>
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
  const isActive = router.asPath.includes(href)
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
