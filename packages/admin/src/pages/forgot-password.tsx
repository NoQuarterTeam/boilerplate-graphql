import * as React from "react"
import { Button, Text, Stack, Heading, Box, Center } from "@chakra-ui/react"
import { gql } from "@apollo/client"
import { useRouter } from "next/router"
import Link from "next/link"
import Head from "next/head"

import { Form } from "components/Form"
import { Input } from "components/Input"
import { useToast } from "lib/hooks/useToast"
import Yup from "lib/yup"
import { useForm } from "lib/hooks/useForm"
import { useForgotPasswordMutation, MutationForgotPasswordArgs } from "lib/graphql"
import { withNoAuth } from "components/hoc/withNoAuth"

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`

const ResetSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
})

function ForgotPassword() {
  const router = useRouter()
  const defaultValues = { email: "" }

  const form = useForm({ schema: ResetSchema, defaultValues })
  const [reset, { loading }] = useForgotPasswordMutation()
  const toast = useToast()

  const handleSubmit = async (variables: MutationForgotPasswordArgs) => {
    return form.handler(() => reset({ variables }), {
      onSuccess: () => {
        toast({
          status: "success",
          description: "Email has been sent to " + variables.email,
        })
        router.push("/")
      },
    })
  }
  return (
    <Center minH="100vh">
      <Head>
        <title>Forgot password</title>
      </Head>
      <Box w={["100%", 400]}>
        <Form {...form} onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Heading as="h1">Forgot your password?</Heading>
            <Text>Enter your email below to receive your password reset instructions.</Text>

            <Input autoFocus name="email" placeholder="Email" />
            <Button isFullWidth colorScheme="purple" type="submit" isDisabled={loading} isLoading={loading}>
              Send instructions
            </Button>
            <Link href="/login">Login</Link>
          </Stack>
        </Form>
      </Box>
    </Center>
  )
}

export default withNoAuth(ForgotPassword)
