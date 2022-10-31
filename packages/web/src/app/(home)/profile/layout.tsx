"use client"
import * as React from "react"
import type { LinkProps } from "@chakra-ui/react"
import { Box, Flex, Heading, Link, Stack, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { useMe } from "lib/hooks/useMe"

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { me, loading } = useMe()
  const router = useRouter()
  React.useEffect(() => {
    if (loading) return
    if (!me) router.replace("/")
  }, [me, loading, router])

  if (loading || !me) return null
  return (
    <Box pt={10} pb={20} w="100%">
      <Heading pb={10} fontSize={{ base: "2xl", md: "3xl" }}>
        Profile
      </Heading>
      <Flex flexWrap={{ base: "wrap", md: "unset" }}>
        <Box pos="relative">
          <Stack
            position="sticky"
            top="100px"
            minW={{ base: "unset", md: "200px" }}
            mr={8}
            flexDir={{ base: "row", md: "column" }}
            mb={{ base: 8, md: 0 }}
            spacing={{ base: 0, md: 4 }}
          >
            <ProfileLink href="/profile">General</ProfileLink>
            <ProfileLink href="/profile/settings">Settings</ProfileLink>
          </Stack>
        </Box>
        <Box w="100%">{children}</Box>
      </Flex>
    </Box>
  )
}

interface ProfileLinkProps extends LinkProps {
  href: string
}
function ProfileLink({ href, ...props }: ProfileLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  const activeColor = useColorModeValue("black", "white")
  const inactiveColor = useColorModeValue("gray.600", "gray.500")
  return (
    <Link
      as={NextLink}
      href={href}
      pr={4}
      h="25px"
      justifyContent={{ base: "center", md: "flex-start" }}
      textDecoration="none !important"
      color={isActive ? activeColor : inactiveColor}
      _hover={{ color: useColorModeValue("black", "white") }}
      fontWeight={isActive ? "semibold" : "normal"}
    >
      {props.children}
    </Link>
  )
}
