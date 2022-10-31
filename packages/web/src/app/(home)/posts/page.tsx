"use client"
import * as React from "react"
import { gql } from "@apollo/client"
import * as c from "@chakra-ui/react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import { usePostsQuery } from "lib/graphql"

dayjs.extend(relativeTime)

const _ = gql`
  query Posts {
    posts {
      items {
        id
        title
        content
        createdAt
        author {
          id
          firstName
        }
      }
      count
    }
  }
`

export default function Posts() {
  const { data } = usePostsQuery()
  const borderColor = c.useColorModeValue("gray.100", "gray.700")
  return (
    <c.Stack py={10} spacing={8}>
      <c.Heading>Posts</c.Heading>
      <c.SimpleGrid columns={{ base: 1, md: 2, lg: 3 }}>
        {data?.posts.items.map((post) => (
          <c.Stack p={4} key={post.id} border="1px solid" borderColor={borderColor} borderRadius="md">
            <c.Text fontSize="2xl" fontWeight="semibold">
              {post.title}
            </c.Text>
            <c.Text>{post.content}</c.Text>
            <c.Flex fontSize="sm" justify="space-between" align="center">
              <c.Text>{dayjs(post.createdAt).fromNow()}</c.Text>
              <c.Text>{post.author.firstName}</c.Text>
            </c.Flex>
          </c.Stack>
        ))}
      </c.SimpleGrid>
    </c.Stack>
  )
}
