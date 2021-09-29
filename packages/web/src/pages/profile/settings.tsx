import * as React from "react"
import { gql } from "@apollo/client"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Center,
  Flex,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react"

import { useDestroyAccountMutation } from "lib/graphql"
import { useLogout } from "lib/hooks/useLogout"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { withAuth } from "components/hoc/withAuth"
import { HomeLayout } from "components/HomeLayout"
import { ProfileLayout } from "components/ProfileLayout"
import { Tile, TileBody, TileFooter, TileHeader, TileHeading } from "components/Tile"

const _ = gql`
  mutation DestroyAccount {
    destroyAccount
  }
`

function Settings() {
  const alertProps = useDisclosure()
  const { me, loading } = useMe()
  const logout = useLogout()
  const cancelRef = React.useRef<HTMLButtonElement>(null)
  const handler = useMutationHandler()

  const [destroy, { loading: destroyLoading }] = useDestroyAccountMutation()

  const handleDestroy = () => {
    return handler(destroy, { onSuccess: () => logout() })
  }
  if (loading)
    return (
      <Center>
        <Spinner />
      </Center>
    )
  if (!me) return null
  return (
    <Stack spacing={6}>
      <Tile>
        <TileHeader>
          <TileHeading>Danger zone</TileHeading>
        </TileHeader>
        <TileBody>
          <Text fontSize="sm">
            Permanently delete your account and all of its contents from the boilerplate. This action is not
            reversible – please continue with caution.
          </Text>
        </TileBody>
        <TileFooter>
          <Flex w="100%" justify="flex-end">
            <Button
              size="sm"
              colorScheme="red"
              isDisabled={destroyLoading}
              isLoading={destroyLoading}
              onClick={alertProps.onOpen}
            >
              Delete account
            </Button>
          </Flex>
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
        </TileFooter>
      </Tile>
    </Stack>
  )
}

Settings.getLayout = (page: React.ReactNode) => (
  <HomeLayout>
    <ProfileLayout>{page}</ProfileLayout>
  </HomeLayout>
)

export default withAuth(Settings)
