import { gql } from "@apollo/client"
import * as c from "@chakra-ui/react"

import { usePostsQuery } from "lib/graphql"
const _ = gql`
  query Posts {
    posts {
      items {
        id
        title
      }
      count
    }
  }
`

export default function Posts() {
  const { data } = usePostsQuery()
  return (
    <c.Box>
      <c.Text>Posts</c.Text>
      <c.Stack>
        {data?.posts.items.map((post) => (
          <c.Text key={post.id}>{post.title}</c.Text>
        ))}
      </c.Stack>
    </c.Box>
  )
}
