import * as React from "react"
import { gql, useApolloClient } from "@apollo/client"
import { Box, Button, Center, Flex, Heading, Stack } from "@chakra-ui/react"
import cookie from "cookie"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import { REDIRECT_PATH, SESSION_TOKEN } from "lib/config"
import { LoginInput, MeDocument, MeFragmentDoc, MeQuery, useLoginMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import Yup from "lib/yup"
import { Form } from "components/Form"
import { FormError } from "components/FormError"
import { withNoAuth } from "components/hoc/withNoAuth"
import { HomeLayout } from "components/HomeLayout"
import { Input } from "components/Input"

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
    <Center flexDir="column" pt={10}>
      <Head>
        <title>Boilerplate - Login</title>
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

Login.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default withNoAuth(Login)
