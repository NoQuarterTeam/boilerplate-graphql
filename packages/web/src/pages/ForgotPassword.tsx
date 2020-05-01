import React, { useState } from "react"
import gql from "graphql-tag"
import { Heading, Text, Button, Flex, Box } from "@chakra-ui/core"
import { RouteComponentProps } from "@reach/router"

import { useForgotPasswordMutation } from "../lib/graphql"
import { useForm } from "../lib/hooks/useForm"
import { Link } from "../components/Link"
import { Form } from "../components/Form"
import { FormError } from "../components/FormError"
import { Input } from "../components/Input"
import Yup from "../lib/yup"

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`

const ForgotSchema = Yup.object().shape<{ email: string }>({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
})

export const ForgotPassword: React.FC<RouteComponentProps> = () => {
  const form = useForm({ validationSchema: ForgotSchema })
  const [success, setSuccess] = useState<boolean>(false)
  const [forgotPassword] = useForgotPasswordMutation()

  const onSubmit = async ({ email }: { email: string }) => {
    const res = await forgotPassword({ variables: { email } })
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
      <Heading pb={10}>Forgot password</Heading>
      {success ? (
        <Box w={["100%", 400]}>
          <Text mb={4}>
            Check your email for password reset link (expires in 24h).
          </Text>
          <Flex justify="space-between" align="center" mt={4}>
            <Link to="/login">Login</Link>
          </Flex>
        </Box>
      ) : (
        <Box w={["100%", 400]}>
          <Form onSubmit={onSubmit} {...form}>
            <Text mb={4}>
              What is your email? We'll send you a link to reset your password
            </Text>
            <Input name="email" label="Email" placeholder="jim@gmail.com" />
            <FormError display="flex" justifyContent="flex-end" />
            <Button
              variantColor="pink"
              type="submit"
              isFullWidth
              loadingText="loading"
              isLoading={form.formState.isSubmitting}
            >
              Send me link
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
