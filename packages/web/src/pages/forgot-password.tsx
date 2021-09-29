import * as React from "react"
import { gql } from "@apollo/client"
import { Box, Button, Center, Heading, Stack, Text } from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import { MutationForgotPasswordArgs, useForgotPasswordMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import { useToast } from "lib/hooks/useToast"
import Yup from "lib/yup"
import { Form } from "components/Form"
import { HomeLayout } from "components/HomeLayout"
import { Input } from "components/Input"

const _ = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`

const ResetSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
})

export default function ForgotPassword() {
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
    <Center flexDir="column" pt={10}>
      <Head>
        <title>Boilerplate - Forgot password</title>
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
ForgotPassword.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
