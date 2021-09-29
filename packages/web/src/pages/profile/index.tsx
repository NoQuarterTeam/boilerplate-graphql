import * as React from "react"
import { gql } from "@apollo/client"
import { Avatar, Button, Center,Spinner, Stack } from "@chakra-ui/react"

import { useUpdateMeMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import { useMe } from "lib/hooks/useMe"
import { useMutationHandler } from "lib/hooks/useMutationHandler"
import { UPLOAD_PATHS } from "lib/uploadPaths"
import Yup from "lib/yup"
import { ButtonGroup } from "components/ButtonGroup"
import { Form } from "components/Form"
import { withAuth } from "components/hoc/withAuth"
import { HomeLayout } from "components/HomeLayout"
import { ImageUploader } from "components/ImageUploader"
import { Input } from "components/Input"
import { ProfileLayout } from "components/ProfileLayout"
import { Tile, TileBody, TileFooter, TileHeader, TileHeading } from "components/Tile"

const _ = gql`
  mutation UpdateMe($data: UpdateUserInput!) {
    updateMe(data: $data) {
      ...Me
    }
  }
`

const ProfileSchema = Yup.object().shape({
  email: Yup.string().email().required("Required").nullIfEmpty(),
  firstName: Yup.string().required("Required").nullIfEmpty(),
  lastName: Yup.string().required("Required").nullIfEmpty(),
})
function Profile() {
  const { me, loading } = useMe()

  const handler = useMutationHandler()
  const [updateUser] = useUpdateMeMutation()

  const updateAvatar = (avatar: string | null) => {
    return handler(() => updateUser({ variables: { data: { avatar } } }), {
      onSuccess: (_, toast) => toast({ description: "Avatar updated." }),
    })
  }

  const defaultValues = {
    email: me?.email || "",
    firstName: me?.firstName || "",
    lastName: me?.lastName || "",
  }

  const form = useForm({ defaultValues, schema: ProfileSchema })

  const handleUpdate = (data: typeof defaultValues) => {
    return form.handler(() => updateUser({ variables: { data } }), {
      onSuccess: (_, toast) => {
        toast({ description: "Info updated!" })
        form.reset(data)
      },
    })
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
        <Form {...form} onSubmit={handleUpdate}>
          <TileHeader>
            <TileHeading>Info</TileHeading>
          </TileHeader>
          <TileBody>
            <Stack spacing={4} maxW="300px">
              <Input variant="outline" name="email" label="Email" />
              <Input variant="outline" name="firstName" label="First name" />
              <Input variant="outline" name="lastName" label="Last name" />
            </Stack>
          </TileBody>
          <TileFooter>
            <ButtonGroup>
              {form.formState.isDirty && (
                <Button variant="ghost" size="sm" onClick={() => form.reset(defaultValues)}>
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                isDisabled={form.formState.isSubmitting || !form.formState.isDirty}
                isLoading={form.formState.isSubmitting}
                colorScheme="purple"
                size="sm"
              >
                Update
              </Button>
            </ButtonGroup>
          </TileFooter>
        </Form>
      </Tile>
      <Tile>
        <TileHeader>
          <TileHeading>Avatar</TileHeading>
        </TileHeader>
        <TileBody>
          <ImageUploader
            dropzoneOptions={{ maxSize: 1000000 }}
            path={UPLOAD_PATHS.userAvatar(me.id)}
            onSubmit={updateAvatar}
          >
            <Avatar src={me.avatar || undefined} size="xl" />
          </ImageUploader>
        </TileBody>
        <TileFooter>Click on your avatar to upload a new photo</TileFooter>
      </Tile>
    </Stack>
  )
}

Profile.getLayout = (page: React.ReactNode) => (
  <HomeLayout>
    <ProfileLayout>{page}</ProfileLayout>
  </HomeLayout>
)

export default withAuth(Profile)
