"use client"
import * as React from "react"
import { gql, useApolloClient } from "@apollo/client"
import * as c from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { ACCESS_TOKEN, REFRESH_TOKEN_KEY } from "lib/config"
import type { LoginInput, MeQuery } from "lib/graphql"
import { MeDocument, useLoginMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import Yup from "lib/yup"
import { Form } from "components/Form"
import { FormError } from "components/FormError"
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
`

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Must be at least 8 characters"),
})

export default function Login() {
  const client = useApolloClient()

  const [login, { loading }] = useLoginMutation()
  const router = useRouter()

  const form = useForm({ schema: LoginSchema })

  const onSubmit = (data: LoginInput) => {
    return form.handler(() => login({ variables: { data } }), {
      onSuccess: async (data) => {
        localStorage.setItem(ACCESS_TOKEN, data.login.token)
        await fetch("/api/login", {
          method: "post",
          body: JSON.stringify({
            [REFRESH_TOKEN_KEY]: data.login.refreshToken,
          }),
        })
        client.writeQuery<MeQuery>({ query: MeDocument, data: { me: data.login.user } })
        router.replace("/")
      },
    })
  }

  return (
    <c.Center flexDir="column" pt={10}>
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

// export default withNoAuth(Login)
