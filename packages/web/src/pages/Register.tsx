import React from "react"
import { Flex, Box, Heading, Button } from "@chakra-ui/core"
import gql from "graphql-tag.macro"
import * as Yup from "yup"
import { RouteComponentProps } from "@reach/router"
import { useApolloClient } from "@apollo/client"

import { Input } from "../components/Input"
import {
  MeFragmentDoc,
  useRegisterMutation,
  MeQuery,
  MeDocument,
  RegisterInput,
} from "../lib/graphql"

import { useForm } from "../lib/hooks/useForm"
import { Form } from "../components/Form"
import { FormError } from "../components/FormError"
import { Link } from "../components/Link"

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

const RegisterSchema = Yup.object().shape<RegisterInput>({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .max(128, "Must be less than 128 characters"),
})

export const Register: React.FC<RouteComponentProps> = () => {
  const client = useApolloClient()
  const [register] = useRegisterMutation()
  const form = useForm<RegisterInput>({ validationSchema: RegisterSchema })

  const onSubmit = async (values: RegisterInput) => {
    const res = await register({
      variables: { data: values },
    })
    form.handler(res, {
      onSuccess: data => {
        localStorage.setItem("token", data.register.token)
        client.writeQuery<MeQuery>({
          query: MeDocument,
          data: { me: data.register.user },
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
      <Heading pb={10}>Register</Heading>
      <Box w={["100%", 400]}>
        <Form onSubmit={onSubmit} {...form}>
          <Input name="firstName" label="First name" placeholder="Jim" />
          <Input name="lastName" label="Last name" placeholder="Bob" />
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
            Register
          </Button>
          <Flex justify="space-between" align="center" mt={4}>
            <Link to="/login">Login</Link>
          </Flex>
        </Form>
      </Box>
    </Flex>
  )
}
