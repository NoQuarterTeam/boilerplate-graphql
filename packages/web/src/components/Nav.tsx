import * as React from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import {
  Box,
  Button,
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
  useColorModeValue,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

import { useLogout } from "lib/hooks/useLogout"
import { useMe } from "lib/hooks/useMe"

import { Limiter } from "./Limiter"
import { LinkButton } from "./LinkButton"

export function Nav() {
  const { me, loading } = useMe()
  const logout = useLogout()

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
        <HStack spacing={4}>
          <HomeLink href="/" color="purple.600" pl={0} textTransform="uppercase" fontWeight="bold">
            Boilerplate
          </HomeLink>
        </HStack>

        {/* Right link list */}
        {loading ? null : me ? (
          <Fade in>
            <HStack spacing={4} display={{ base: "none", md: "flex" }}>
              <NextLink passHref href="/">
                <Button variant="outline" borderWidth={2} colorScheme="purple" as={Link}>
                  Dashboard
                </Button>
              </NextLink>
            </HStack>
          </Fade>
        ) : (
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

        {/* Mobile link list */}
        <Menu>
          <MenuButton
            as={IconButton}
            display={{ base: "flex", md: "none" }}
            icon={<GiHamburgerMenu />}
            variant="ghost"
          />
          <MenuList>
            {me ? (
              <>
                <MenuItem>Profile</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => logout()}>Logout</MenuItem>
              </>
            ) : (
              <>
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
