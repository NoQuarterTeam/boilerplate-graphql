import * as React from "react"
import { gql, useApolloClient } from "@apollo/client"
import * as c from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import { LOGIN_REFRESH_TOKEN_KEY, LOGIN_TOKEN_KEY } from "lib/config"
import type { LoginInput, MeQuery } from "lib/graphql"
import { MeDocument, MeFragmentDoc, useLoginMutation } from "lib/graphql"
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
      refreshToken
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

  const form = useForm({ schema: LoginSchema })

  const onSubmit = (data: LoginInput) => {
    return form.handler(() => login({ variables: { data } }), {
      onSuccess: async (data) => {
        await fetch("/api/login", {
          method: "post",
          body: JSON.stringify({
            [LOGIN_TOKEN_KEY]: data.login.token,
            [LOGIN_REFRESH_TOKEN_KEY]: data.login.refreshToken,
          }),
        })
        client.writeQuery<MeQuery>({ query: MeDocument, data: { me: data.login.user } })
        router.replace("/")
      },
    })
  }

  return (
    <c.Center flexDir="column" pt={10}>
      <Head>
        <title>Login</title>
      </Head>
      <c.Box w={["100%", 400]}>
        <Form onSubmit={onSubmit} {...form}>
          <c.Stack spacing={2}>
            <c.Heading as="h1">Login</c.Heading>

            <Input name="email" label="Email" placeholder="jim@gmail.com" />
            <Input name="password" label="Password" type="password" placeholder="********" />
            <c.Button colorScheme="purple" type="submit" w="100%" isLoading={loading} isDisabled={loading}>
              Login
            </c.Button>
            <FormError />
            <c.Flex justify="space-between">
              <Link href="/register">Register</Link>
              <Link href="/forgot-password">Forgot password?</Link>
            </c.Flex>
          </c.Stack>
        </Form>
      </c.Box>
    </c.Center>
  )
}

Login.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default withNoAuth(Login)
