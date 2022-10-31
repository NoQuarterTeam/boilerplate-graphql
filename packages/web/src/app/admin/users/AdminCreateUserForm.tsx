import * as React from "react"
import { gql } from "@apollo/client"
import { Button, Stack } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

import { useAdminCreateUserMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import Yup from "lib/yup"

import { ButtonGroup } from "../../../components/ButtonGroup"
import { Form } from "../../../components/Form"
import { FormError } from "../../../components/FormError"
import { Input } from "../../../components/Input"

const _ = gql`
  mutation AdminCreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      id
    }
  }
`

interface Props {
  onClose: () => void
}

const UserSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
})

export function AdminCreateUserForm(props: Props) {
  const router = useRouter()
  const [createUser] = useAdminCreateUserMutation()
  const defaultValues = {
    email: "",
    firstName: "",
    lastName: "",
  }
  const form = useForm({ defaultValues, schema: UserSchema })
  const handleSubmit = (data: Yup.InferType<typeof UserSchema>) => {
    return form.handler(() => createUser({ variables: { data: { ...data, password: "-----------" } } }), {
      onSuccess: (res, toast) => {
        router.push("/admin/users/" + res.createUser.id)
        toast({ description: "User created" })
      },
    })
  }
  return (
    <Form {...form} onSubmit={handleSubmit}>
      <Stack>
        <Input name="firstName" label="First name" />
        <Input name="lastName" label="Last name" />
        <Input name="email" label="Email" />
        <FormError />
        <ButtonGroup>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button
            colorScheme="purple"
            type="submit"
            isLoading={form.formState.isSubmitting}
            isDisabled={form.formState.isSubmitting}
          >
            Create
          </Button>
        </ButtonGroup>
      </Stack>
    </Form>
  )
}
