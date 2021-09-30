import * as React from "react"
import { BiCog, BiExit, BiMoon, BiSun, BiUser } from "react-icons/bi"
import { GiHamburgerMenu } from "react-icons/gi"
import {
  Avatar,
  Box,
  Fade,
  HStack,
  IconButton,
  Link,
  LinkProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { Role } from "lib/graphql"
import { useLogout } from "lib/hooks/useLogout"
import { useMe } from "lib/hooks/useMe"

import { Limiter } from "./Limiter"
import { LinkButton } from "./LinkButton"

export function Nav() {
  const { me, loading } = useMe()
  const logout = useLogout()
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === "dark"

  return (
    <Box
      w="100%"
      pos="fixed"
      top={0}
      left={0}
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.100", "gray.700")}
      zIndex={500}
    >
      <Limiter
        display="flex"
        transition="200ms all"
        py={{ base: 4, md: 3 }}
        bg={useColorModeValue("white", "gray.800")}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        {/* Left link list */}
        <HStack>
          <HomeLink
            href="/"
            color={useColorModeValue("purple.600", "purple.400")}
            pl={0}
            textTransform="uppercase"
            fontWeight="bold"
          >
            Boilerplate
          </HomeLink>
        </HStack>

        {/* Right link list */}

        {!me && !loading && (
          <Fade in>
            <HStack spacing={4} display={{ base: "none", md: "flex" }}>
              <LinkButton href="/login" variant="ghost">
                Login
              </LinkButton>
              <LinkButton href="/register" variant="solid" colorScheme="purple">
                Register
              </LinkButton>
            </HStack>
          </Fade>
        )}

        {/* Right menu list */}
        <Menu placement="bottom-end">
          <MenuButton
            as={IconButton}
            display={{ base: "flex", md: me ? "flex" : "none" }}
            variant="unstyled"
            icon={me ? <Avatar size="xs" src={me.avatar || undefined} /> : <Box as={GiHamburgerMenu} />}
          />

          <MenuList fontSize="md">
            {me ? (
              <>
                <NextLink passHref href="/profile">
                  <MenuItem icon={<Box as={BiUser} boxSize="16px" />}>Profile</MenuItem>
                </NextLink>
                {me.role === Role.Admin && (
                  <NextLink passHref href="/admin">
                    <MenuItem icon={<Box as={BiCog} boxSize="16px" />}>Admin</MenuItem>
                  </NextLink>
                )}
                <MenuDivider />
                <MenuItem
                  closeOnSelect={false}
                  icon={<Box as={isDark ? BiSun : BiMoon} boxSize="16px" />}
                  onClick={toggleColorMode}
                >
                  Toggle theme
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => logout()} icon={<Box as={BiExit} boxSize="16px" />}>
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  closeOnSelect={false}
                  icon={<Box as={isDark ? BiSun : BiMoon} boxSize="16px" />}
                  onClick={toggleColorMode}
                >
                  Toggle theme
                </MenuItem>
                <MenuDivider />
                <NextLink passHref href="/login">
                  <MenuItem>Login</MenuItem>
                </NextLink>
                <NextLink passHref href="/register">
                  <MenuItem fontWeight="semibold">Register</MenuItem>
                </NextLink>
              </>
            )}
          </MenuList>
        </Menu>
      </Limiter>
    </Box>
  )
}

interface HomeLinkProps extends LinkProps {
  href: string
}

function HomeLink({ href, ...props }: HomeLinkProps) {
  const { asPath } = useRouter()
  const isActive = asPath === href

  return (
    <NextLink passHref href={href}>
      <Link
        px={4}
        py={2}
        textDecor="none !important"
        _hover={{ color: isActive ? "purple.600" : "purple.500" }}
        color={isActive ? "purple.600" : "gray.500"}
        {...props}
      >
        {props.children}
      </Link>
    </NextLink>
  )
}
