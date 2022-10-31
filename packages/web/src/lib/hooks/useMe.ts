import { gql } from "@apollo/client"

import { useMeQuery } from "lib/graphql"

const _ = gql`
  fragment Me on User {
    id
    firstName
    lastName
    fullName
    avatar
    email
    role
  }
  query Me {
    me {
      ...Me
    }
  }
`

export function useMe() {
  const res = useMeQuery()
  return { me: res.data?.me, ...res }
}
