import * as React from "react"
import { Center } from "@chakra-ui/layout"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Heading,
  useDisclosure,
} from "@chakra-ui/react"
import { Spinner } from "@chakra-ui/spinner"

import { useDestroyAccountMutation } from "lib/graphql"
import { useLogout } from "lib/hooks/useLogout"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { withAuth } from "components/hoc/withAuth"
import { HomeLayout } from "components/HomeLayout"

function Profile() {
  const alertProps = useDisclosure()
  const logout = useLogout()
  const cancelRef = React.useRef<HTMLButtonElement>(null)
  const handler = useMutationHandler()
  const [destroy, { loading: destroyLoading }] = useDestroyAccountMutation()
  const handleDestroy = () => {
    return handler(destroy, { onSuccess: () => logout() })
  }
  const { me, loading } = useMe()
  if (loading)
    return (
      <Center>
        <Spinner />
      </Center>
    )
  if (!me) return null
  return (
    <>
      <Heading my={4}>Hello, {me.firstName}</Heading>
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
      <AlertDialog {...alertProps} motionPreset="slideInBottom" isCentered leastDestructiveRef={cancelRef}>
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
}

Profile.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default withAuth(Profile)
