import * as React from "react"
import cookie from "cookie"
import { gql, useApolloClient } from "@apollo/client"
import { Box, Stack, Heading, Button, Center, Flex } from "@chakra-ui/react"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"

import { MeFragmentDoc, LoginInput, MeQuery, MeDocument, useLoginMutation } from "lib/graphql"
import Yup from "lib/yup"
import { Form } from "components/Form"
import { Input } from "components/Input"
import { REDIRECT_PATH, SESSION_TOKEN } from "lib/config"
import { FormError } from "components/FormError"
import { useForm } from "lib/hooks/useForm"
import { withNoAuth } from "components/hoc/withNoAuth"

const _ = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        ...Me
      }
      token
    }
  }
  ${MeFragmentDoc}
`

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Must be at least 8 characters"),
})

function Login() {
  const client = useApolloClient()

  const [login, { loading }] = useLoginMutation()
  const router = useRouter()
  const redirect = router.query[REDIRECT_PATH] as string | undefined
  const form = useForm({ schema: LoginSchema })

  const onSubmit = (data: LoginInput) => {
    return form.handler(() => login({ variables: { data } }), {
      onSuccess: (data) => {
        document.cookie = cookie.serialize(SESSION_TOKEN, data.login.token, {
          path: "/",
          maxAge: 30 * 24 * 60 * 60, // 30 days
        })
        client.writeQuery<MeQuery>({ query: MeDocument, data: { me: data.login.user } })
        router.replace(redirect || "/")
      },
    })
  }
  return (
    <Center minH={{ base: "auto", md: "100vh" }} p={4} pt={{ base: 40, md: 4 }}>
      <Head>
        <title>Fullstack boilerplate - Login</title>
      </Head>
      <Box w={["100%", 400]}>
        <Form onSubmit={onSubmit} {...form}>
          <Stack spacing={2}>
            <Heading as="h1">Login</Heading>
            <Input name="email" label="Email" placeholder="jim@gmail.com" />
            <Input name="password" label="Password" type="password" placeholder="********" />
            <Button colorScheme="purple" type="submit" isFullWidth isLoading={loading} isDisabled={loading}>
              Login
            </Button>
            <FormError />
            <Flex justify="space-between">
              <Link href="/register">Register</Link>
              <Link href="/forgot-password">Forgot password?</Link>
            </Flex>
          </Stack>
        </Form>
      </Box>
    </Center>
  )
}

export default withNoAuth(Login)
