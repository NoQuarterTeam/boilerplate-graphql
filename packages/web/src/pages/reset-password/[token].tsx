import * as React from "react"
import { Stack, Button, Text, Heading, Box, Center } from "@chakra-ui/react"
import { gql } from "@apollo/client"
import { useRouter } from "next/router"
import Link from "next/link"
import Head from "next/head"

import { Form } from "components/Form"
import { Input } from "components/Input"
import { useToast } from "lib/hooks/useToast"
import Yup from "lib/yup"
import { useResetPasswordMutation, ResetPasswordInput } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"

export const RESET_PASSWORD = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(8, "Must be at least 8 characters"),
})

export default function ResetPassword() {
  const { query, push } = useRouter()
  const token = query.token as string
  const [reset, { loading }] = useResetPasswordMutation()
  const form = useForm({ schema: ResetPasswordSchema })
  const toast = useToast()
  const handleSubmit = async (data: ResetPasswordInput) => {
    if (!data || !token) return
    return form.handler(() => reset({ variables: { data: { ...data, token } } }), {
      onSuccess: () => {
        form.reset()
        push("/login")
        toast({
          status: "success",
          description: "Password reset! Try logging in!",
        })
      },
    })
  }
  return (
    <Center minH={{ base: "auto", md: "100vh" }} p={4} pt={{ base: 40, md: 4 }}>
      <Head>
        <title>Fullstack boilerplate - Reset password</title>
      </Head>
      <Box w={["100%", 400]}>
        <Form {...form} onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Box>
              <Heading as="h1">Reset password</Heading>
              <Text>Enter a new password below.</Text>
            </Box>
            <Input name="password" placeholder="*********" type="password" />
            <Button isFullWidth colorScheme="purple" type="submit" isDisabled={loading} isLoading={loading}>
              Reset
            </Button>
            <Link href="/login">Login</Link>
          </Stack>
        </Form>
      </Box>
    </Center>
  )
}
