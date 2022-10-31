"use client"
import * as React from "react"
import { gql } from "@apollo/client"
import { Avatar, Box, Center, Flex, Heading, Spinner, Stack, Text } from "@chakra-ui/react"

import { useGetUserQuery } from "lib/graphql"
import { NoData } from "components/NoData"

const _ = gql`
  fragment UserDetail on User {
    id
    fullName
    bio
    avatar
    email
    createdAt
  }

  query GetUser($where: UserWhereInput) {
    user(where: $where) {
      ...UserDetail
    }
  }
`

export default function Users({ params }: { params: { id: string } }) {
  const id = params.id
  const { data, loading } = useGetUserQuery({ variables: { where: { id: { equals: id } } } })
  const user = data?.user

  if (loading)
    return (
      <Center h="100%">
        <Spinner />
      </Center>
    )
  if (!user) return <NoData>User not found</NoData>
  return (
    <Box>
      <Flex justify="space-between">
        <Stack>
          <Heading fontWeight={800}>{user.fullName}</Heading>
          <Text>{user.email}</Text>
          <Text>{user.bio}</Text>
        </Stack>
        {user.avatar && <Avatar size="xl" src={user.avatar} name={user.fullName} />}
      </Flex>
    </Box>
  )
}
