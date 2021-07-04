import * as React from "react"
import { Button, Input, Text, Stack } from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { gql, useApolloClient } from "@apollo/client"
import { MeDocument, useLoginMutation } from "../lib/graphql"
import { SESSION_TOKEN } from "../lib/config"
import { useNavigation } from "@react-navigation/core"

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

export function Login() {
  const { navigate } = useNavigation()
  const client = useApolloClient()
  const [login] = useLoginMutation()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const handleLogin = async () => {
    try {
      const res = await login({ variables: { data: { email, password } } })
      if (res.data?.login.token) {
        await AsyncStorage.setItem(SESSION_TOKEN, res.data.login.token)
        client.writeQuery({ query: MeDocument, data: { me: res.data.login.user } })
        navigate("Home")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Stack p={6} mt={10} space={2} w="100%">
      <Text mb={10} fontSize="2xl" fontWeight="bold">
        Login
      </Text>
      <Input
        _focus={{ borderColor: "purple.500" }}
        type="email"
        autoCapitalize="none"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        _focus={{ borderColor: "purple.500" }}
        placeholder="Password"
        type="password"
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />
      <Button onPress={handleLogin} colorScheme="purple">
        Submit
      </Button>
    </Stack>
  )
}
