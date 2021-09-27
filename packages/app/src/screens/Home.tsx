import * as React from "react"
import { useNavigation } from "@react-navigation/core"
import { Button, Flex, Stack, Text } from "native-base"

import { useLogout } from "../lib/hooks/useLogout"
import { useMe } from "../lib/hooks/useMe"

export function Home() {
  const { me, loading } = useMe()
  const { navigate } = useNavigation()
  const logout = useLogout()
  return (
    <Flex h="100%" p={4} py={20} justifyContent="space-between">
      <Text fontSize="3xl" textAlign="center" fontWeight="bold">
        Welcome to the Fullstack boilerplate
      </Text>
      {loading ? null : me ? (
        <Stack p={4} space={4} w="100%">
          <Text fontSize="2xl">Hey {me.firstName}!</Text>
          <Button colorScheme="purple" onPress={logout}>
            Logout
          </Button>
        </Stack>
      ) : (
        <Button colorScheme="purple" onPress={() => navigate("Login")}>
          Login
        </Button>
      )}
      <Flex />
    </Flex>
  )
}
