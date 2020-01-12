import React from "react"
import { Flex, Box, Heading, Button } from "@chakra-ui/core"
import gql from "graphql-tag.macro"
import * as Yup from "yup"
import { RouteComponentProps } from "@reach/router"
import { useApolloClient } from "@apollo/client"

import {
  MeFragmentDoc,
  useLoginMutation,
  MeQuery,
  MeDocument,
  LoginInput,
} from "../lib/graphql"

import { Input } from "../components/Input"
import { useForm } from "../lib/hooks/useForm"
import { Form } from "../components/Form"
import { FormError } from "../components/FormError"
import { Link } from "../components/Link"

export const LOGIN = gql`
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

const LoginSchema = Yup.object().shape<LoginInput>({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string().min(8, "Must be at least 8 characters"),
})

export const Login: React.FC<RouteComponentProps> = () => {
  const client = useApolloClient()
  const [login] = useLoginMutation()
  const form = useForm<LoginInput>({ validationSchema: LoginSchema })
  const onSubmit = async (values: LoginInput) => {
    const res = await login({
      variables: { data: values },
    })
    form.handler(res, {
      onSuccess: data => {
        localStorage.setItem("token", data.login.token)
        client.writeQuery<MeQuery>({
          query: MeDocument,
          data: { me: data.login.user },
        })
      },
    })
  }
  return (
    <Flex
      h="100vh"
      w="100%"
      align="center"
      justifyContent="flex-start"
      p={{ base: 10, lg: "5%" }}
      direction="column"
    >
      <Heading pb={10}>Login</Heading>
      <Box w={["100%", 400]}>
        <Form onSubmit={onSubmit} {...form}>
          <Input name="email" label="Email" placeholder="jim@gmail.com" />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="********"
          />
          <FormError display="flex" justifyContent="flex-end" />
          <Button
            variantColor="pink"
            type="submit"
            isFullWidth
            loadingText="loading"
            isLoading={form.formState.isSubmitting}
          >
            Login
          </Button>
          <Flex justify="space-between" align="center" mt={4}>
            <Link to="/register">No account?</Link>
            <Link to="/forgot-password">Forgot password?</Link>
          </Flex>
        </Form>
      </Box>
    </Flex>
  )
}
