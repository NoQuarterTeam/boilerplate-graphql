import React, { useState } from "react"
import gql from "graphql-tag"
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/core"
import { RouteComponentProps, useLocation } from "@reach/router"

import { useForm } from "../lib/hooks/useForm"
import { Link } from "../components/Link"
import { Form } from "../components/Form"
import { FormError } from "../components/FormError"
import { Input } from "../components/Input"
import Yup from "../lib/yup"
import { parse } from "query-string"
import { useResetPasswordMutation } from "../lib/graphql"

export const FORGOT_PASSWORD = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`

const ResetSchema = Yup.object().shape<{
  password: string
  confirmPassword: string
}>({
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .max(128, "Must be less than 128 characters"),
  confirmPassword: Yup.string().when("password", {
    is: val => val && val.length > 0,
    then: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords need to match")
      .required("Required"),
  }),
})

export const ResetPassword: React.FC<RouteComponentProps> = () => {
  const form = useForm({ validationSchema: ResetSchema })
  const [success, setSuccess] = useState<boolean>(false)
  const [forgotPassword] = useResetPasswordMutation()
  const location = useLocation()
  const searchParams = parse(location.search)
  const token: string =
    typeof searchParams.token === "string" ? searchParams.token : ""

  const onSubmit = async ({ password }: { password: string }) => {
    console.log("onSubmit", password, token)
    const res = await forgotPassword({
      variables: {
        data: {
          password: password,
          token: token,
        },
      },
    })
    form.handler(res, { onSuccess: () => setSuccess(true) })
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
      <Heading pb={10}>Reset password</Heading>
      {success ? (
        <Box w={["100%", 400]}>
          <Text mb={4}>
            Your password was reset! Please login with your new password.
          </Text>
          <Flex justify="space-between" align="center" mt={4}>
            <Link to="/login">Login</Link>
          </Flex>
        </Box>
      ) : (
        <Box w={["100%", 400]}>
          <Form onSubmit={onSubmit} {...form}>
            <Text mb={4}>Choose a new password</Text>
            <Input
              name="password"
              label="Password"
              placeholder="********"
              type="password"
            />
            <Input
              name="confirmPassword"
              label="Confirm Password"
              placeholder="********"
              type="password"
            />
            <FormError display="flex" justifyContent="flex-end" />
            <Button
              variantColor="pink"
              type="submit"
              isFullWidth
              loadingText="loading"
              isLoading={form.formState.isSubmitting}
            >
              Reset Password
            </Button>
            <Flex justify="space-between" align="center" mt={4}>
              <Link to="/login">Login</Link>
            </Flex>
          </Form>
        </Box>
      )}
    </Flex>
  )
}
