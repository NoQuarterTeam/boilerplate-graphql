import * as React from "react"
import { Button, Stack, Center, Text } from "native-base"
import { useMe } from "../lib/hooks/useMe"
import { useNavigation } from "@react-navigation/core"
import { useLogout } from "../lib/hooks/useLogout"

export function Home() {
  const { me, loading } = useMe()
  const { navigate } = useNavigation()
  const logout = useLogout()
  return (
    <Center h="100%" p={4}>
      <Text fontSize="3xl" textAlign="center" fontWeight="bold">
        Welcome to the Fullstack boilerplate
      </Text>

      {loading ? null : me ? (
        <Stack p={4} space={4} w="100%">
          <Text fontSize="lg">Hey {me.firstName}!</Text>
          <Button colorScheme="purple" onPress={logout}>
            Logout
          </Button>
        </Stack>
      ) : (
        <Button colorScheme="purple" onPress={() => navigate("Login")}>
          Login
        </Button>
      )}
    </Center>
  )
}
