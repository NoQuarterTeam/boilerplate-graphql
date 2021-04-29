import * as React from "react"
import { gql } from "@apollo/client"
import { useGetUsersQuery } from "lib/graphql"
import { Flex, Stack, Text } from "@chakra-ui/react"

export const GET_USERS = gql`
  query GetUsers($orderBy: [UserOrderByInput!]) {
    users(orderBy: $orderBy) {
      id
      fullName
      createdAt
    }
  }
`

export function UsersList() {
  const { data } = useGetUsersQuery()
  return (
    <Stack>
      <Text fontWeight={700}>Users signed up</Text>
      {data?.users.map((user) => (
        <Flex key={user.id}>{user.fullName}</Flex>
      ))}
    </Stack>
  )
}
