import * as React from "react"
import cookie from "cookie"
import { gql, useApolloClient } from "@apollo/client"
import { Box, Stack, Heading, Button, Center } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Link from "next/link"
import Head from "next/head"

import { MeFragmentDoc, RegisterInput, MeQuery, MeDocument, useRegisterMutation } from "lib/graphql"
import Yup from "lib/yup"
import { Form } from "components/Form"
import { Input } from "components/Input"
import { SESSION_TOKEN } from "lib/config"
import { FormError } from "components/FormError"
import { useForm } from "lib/hooks/useForm"
import { withNoAuth } from "components/hoc/withNoAuth"

export const REGISTER = gql`
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
  const redirectTo = router.query.redirectTo as string | undefined
  const form = useForm({ schema: RegisterSchema })

  const onSubmit = (values: RegisterInput) => {
    return form.handler(() => register({ variables: { data: values } }), {
      onSuccess: (data) => {
        document.cookie = cookie.serialize(SESSION_TOKEN, data.register.token, {
          path: "/",
          maxAge: 30 * 24 * 60 * 60, // 30 days
        })
        client.writeQuery<MeQuery>({
          query: MeDocument,
          data: { me: data.register.user },
        })
        router.replace(redirectTo || "/")
      },
    })
  }
  return (
    <Center minH={{ base: "auto", md: "100vh" }} p={4} pt={{ base: 40, md: 4 }}>
      <Head>
        <title>Fullstack boilerplate - Register</title>
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
export default withNoAuth(Register)
