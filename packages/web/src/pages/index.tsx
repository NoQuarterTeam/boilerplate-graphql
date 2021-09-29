import * as React from "react"
import { BiMoon, BiSun } from "react-icons/bi"
import { gql } from "@apollo/client"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  IconButton,
  Spinner,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import Head from "next/head"

import { useDestroyAccountMutation } from "lib/graphql"
import { useLogout } from "lib/hooks/useLogout"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { HomeLayout } from "components/HomeLayout"

const _ = gql`
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
        <title>Boilerplate</title>
      </Head>

      <Center minH="80vh" p={4} pt={{ base: 40, md: 4 }} pos="relative">
        <VStack spacing={6}>
          <Heading as="h1" textAlign="center">
            Welcome to the Boilerplate
          </Heading>
          {loading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            me && (
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
            )
          )}
        </VStack>
        <Box pos="absolute" bottom={4} right={4}>
          <IconButton
            borderRadius="full"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            variant="ghost"
            onClick={toggleColorMode}
            icon={<Box as={isDark ? BiSun : BiMoon} boxSize="20px" />}
          />
        </Box>
      </Center>
    </Box>
  )
}

Home.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
