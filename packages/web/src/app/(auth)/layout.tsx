"use client"
import type { LinkProps} from "@chakra-ui/react";
import { Box, HStack, Link, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"

import { Limiter } from "components/Limiter"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box h="65px" w="100%" borderBottom="1px solid" borderColor={useColorModeValue("gray.100", "gray.700")}>
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
              Home
            </HomeLink>
          </HStack>
        </Limiter>
      </Box>
      {children}
    </>
  )
}

interface HomeLinkProps extends LinkProps {
  href: string
}

function HomeLink({ href, ...props }: HomeLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      as={NextLink}
      href={href}
      px={4}
      py={2}
      textDecor="none !important"
      _hover={{ color: isActive ? "purple.600" : "purple.500" }}
      color={isActive ? "purple.600" : "gray.500"}
      {...props}
    >
      {props.children}
    </Link>
  )
}
