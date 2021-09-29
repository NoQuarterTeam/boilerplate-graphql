import * as React from "react"
import { Box, Flex, Heading, Link,LinkProps, Stack, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"

export const ProfileLayout: React.FC = ({ children }) => {
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
const ProfileLink: React.FC<ProfileLinkProps> = ({ href, ...props }) => {
  const { asPath } = useRouter()
  const isActive = asPath === href
  const activeColor = useColorModeValue("black", "white")
  const inactiveColor = useColorModeValue("gray.600", "gray.500")
  return (
    <NextLink href={href} passHref>
      <Link
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
    </NextLink>
  )
}
