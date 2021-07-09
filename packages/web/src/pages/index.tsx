import * as React from "react"
import NextLink from "next/link"
import {
  Box,
  Link,
  Center,
  Button,
  Heading,
  HStack,
  IconButton,
  useColorMode,
  Spinner,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  VStack,
} from "@chakra-ui/react"
import Head from "next/head"
import { BiMoon, BiSun } from "react-icons/bi"
import { gql } from "@apollo/client"

import { useLogout } from "lib/hooks/useLogout"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { useDestroyAccountMutation } from "lib/graphql"

export const DESTROY_ACCOUNT = gql`
  mutation DestroyAccount {
    destroyAccount
  }
`

export default function Home() {
  const { me, loading } = useMe()
  const alertProps = useDisclosure()
  const logout = useLogout()
  const cancelRef = React.useRef<HTMLButtonElement>(null)
  const { colorMode, toggleColorMode } = useColorMode()
  const handler = useMutationHandler()
  const [destroy, { loading: destroyLoading }] = useDestroyAccountMutation()
  const handleDestroy = () => {
    return handler(destroy, { onSuccess: () => logout() })
  }
  const isDark = colorMode === "dark"
  return (
    <Box>
      <Head>
        <title>Fullstack boilerplate</title>
      </Head>

      <Center minH={{ base: "auto", md: "100vh" }} p={4} pt={{ base: 40, md: 4 }}>
        <VStack spacing={6}>
          <Heading as="h1" textAlign="center">
            Welcome to the Fullstack boilerplate
          </Heading>
          {loading ? (
            <Center>
              <Spinner />
            </Center>
          ) : me ? (
            <>
              <Heading as="h3" fontSize="2xl">
                Hello, {me.firstName}!
              </Heading>
              <HStack>
                <Button size="sm" variant="outline" isDisabled={destroyLoading} onClick={() => logout()}>
                  Logout
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  isDisabled={destroyLoading}
                  isLoading={destroyLoading}
                  variant="outline"
                  onClick={alertProps.onOpen}
                >
                  Delete account
                </Button>
              </HStack>

              <AlertDialog
                {...alertProps}
                motionPreset="slideInBottom"
                isCentered
                leastDestructiveRef={cancelRef}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete account
                    </AlertDialogHeader>
                    <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>
                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={alertProps.onClose}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={handleDestroy}
                        isLoading={destroyLoading}
                        isDisabled={destroyLoading}
                        ml={3}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </>
          ) : (
            <>
              <HStack mt={4}>
                <NextLink passHref href="/login">
                  <Button as={Link} variant="ghost" href="/login" sx={{ textDecor: "none !important" }}>
                    Login
                  </Button>
                </NextLink>
                <NextLink passHref href="/register">
                  <Button colorScheme="purple" as={Link} sx={{ textDecor: "none !important" }}>
                    Register
                  </Button>
                </NextLink>
              </HStack>
            </>
          )}

          <Box pos="absolute" top={4} right={4}>
            <IconButton
              borderRadius="full"
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              variant="ghost"
              onClick={toggleColorMode}
              icon={<Box as={isDark ? BiSun : BiMoon} boxSize="20px" />}
            />
          </Box>
        </VStack>
      </Center>
    </Box>
  )
}
