import * as React from "react"
import { gql, useApolloClient } from "@apollo/client"
import { Box, Button, Center, Heading, Stack } from "@chakra-ui/react"
import cookie from "cookie"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import { REDIRECT_PATH, SESSION_TOKEN } from "lib/config"
import { MeDocument, MeFragmentDoc, MeQuery, RegisterInput, useRegisterMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import Yup from "lib/yup"
import { Form } from "components/Form"
import { FormError } from "components/FormError"
import { withNoAuth } from "components/hoc/withNoAuth"
import { HomeLayout } from "components/HomeLayout"
import { Input } from "components/Input"

const _ = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      user {
        ...Me
      }
      token
    }
  }
  ${MeFragmentDoc}
`

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Must be at least 8 characters").required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
})

function Register() {
  const client = useApolloClient()

  const [register, { loading }] = useRegisterMutation()
  const router = useRouter()
  const redirect = router.query[REDIRECT_PATH] as string | undefined
  const form = useForm({ schema: RegisterSchema })

  const onSubmit = (data: RegisterInput) => {
    return form.handler(() => register({ variables: { data } }), {
      onSuccess: (data) => {
        document.cookie = cookie.serialize(SESSION_TOKEN, data.register.token, {
          path: "/",
          maxAge: 30 * 24 * 60 * 60, // 30 days
        })
        client.writeQuery<MeQuery>({ query: MeDocument, data: { me: data.register.user } })
        router.replace(redirect || "/")
      },
    })
  }
  return (
    <Center flexDir="column" mt={10}>
      <Head>
        <title>Boilerplate - Register</title>
      </Head>
      <Box w={["100%", 400]}>
        <Form onSubmit={onSubmit} {...form}>
          <Stack spacing={2}>
            <Heading as="h1">Register</Heading>
            <Input name="email" label="Email" placeholder="jim@gmail.com" />
            <Input name="password" label="Password" type="password" placeholder="********" />
            <Input name="firstName" label="First name" placeholder="Jim" />
            <Input name="lastName" label="Last name" placeholder="Bob" />
            <Button colorScheme="purple" type="submit" isFullWidth isLoading={loading} isDisabled={loading}>
              Register
            </Button>
            <FormError />
            <Link href="/login">Already have an account?</Link>
          </Stack>
        </Form>
      </Box>
    </Center>
  )
}

Register.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
export default withNoAuth(Register)
