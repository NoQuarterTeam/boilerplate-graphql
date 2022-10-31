"use client"
import * as React from "react"
import { gql } from "@apollo/client"
import { Box, Button, Center, Heading, Stack, Text } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import type { ResetPasswordInput } from "lib/graphql"
import { useResetPasswordMutation } from "lib/graphql"
import { useForm } from "lib/hooks/useForm"
import { useToast } from "lib/hooks/useToast"
import Yup from "lib/yup"
import { Form } from "components/Form"
import { Input } from "components/Input"

const _ = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(8, "Must be at least 8 characters"),
})

export default function ResetPassword({ params }: { params: { token: string } }) {
  const { push } = useRouter()
  const token = params.token
  const [reset, { loading }] = useResetPasswordMutation()
  const form = useForm({ schema: ResetPasswordSchema })
  const toast = useToast()
  const handleSubmit = async (data: ResetPasswordInput) => {
    if (!data) return
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
    <Center flexDir="column" pt={10}>
      <Box w={["100%", 400]}>
        <Form {...form} onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Box>
              <Heading as="h1">Reset password</Heading>
              <Text>Enter a new password below.</Text>
            </Box>
            <Input name="password" placeholder="*********" type="password" />
            <Button w="100%" colorScheme="purple" type="submit" isDisabled={loading} isLoading={loading}>
              Reset
            </Button>
            <Link href="/login">Login</Link>
          </Stack>
        </Form>
      </Box>
    </Center>
  )
}
