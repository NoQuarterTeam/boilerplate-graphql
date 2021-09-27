import * as React from "react"
import { gql, useApolloClient } from "@apollo/client"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/core"
import { Pressable, SmallCloseIcon, Stack, Text } from "native-base"

import { Form, FormButton } from "../components/Form"
import { withTheme } from "../components/hoc/withTheme"
import { Input } from "../components/Input"
import { SESSION_TOKEN } from "../lib/config"
import { MeDocument, useLoginMutation } from "../lib/graphql"
import { useForm } from "../lib/hooks/useForm"
import { Yup } from "../lib/yup"

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        ...Me
      }
      token
    }
  }
`

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Must be at least 8 characters"),
})

function _Login() {
  const { navigate, goBack } = useNavigation()
  const client = useApolloClient()
  const defaultValues = { email: "", password: "" }
  const form = useForm({ defaultValues, schema: LoginSchema })
  const [login] = useLoginMutation()

  const handleLogin = async (data: typeof defaultValues) => {
    return form.handler(() => login({ variables: { data } }), {
      onSuccess: async (data) => {
        try {
          await AsyncStorage.setItem(SESSION_TOKEN, data.login.token)
          client.writeQuery({ query: MeDocument, data: { me: data.login.user } })
          navigate("Home")
        } catch (error) {
          console.log(error)
        }
      },
    })
  }
  return (
    <Form {...form}>
      <Stack p={6} space={2} w="100%">
        <Pressable pos="absolute" top={4} right={4} onPress={goBack}>
          <SmallCloseIcon />
        </Pressable>

        <Text mt={5} mb={6} fontSize="4xl" fontWeight="bold">
          Login
        </Text>
        <Input autoCapitalize="none" placeholder="jim@bob.com" name="email" label="Email" />
        <Input
          placeholder="********"
          secureTextEntry
          autoCapitalize="none"
          name="password"
          label="Password"
        />
        <FormButton colorScheme="purple" onPress={handleLogin}>
          Submit
        </FormButton>
      </Stack>
    </Form>
  )
}

export const Login = withTheme(_Login)
