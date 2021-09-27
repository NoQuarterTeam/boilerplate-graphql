import { gql } from "@apollo/client"

import { useMeQuery } from "../graphql"

export const ME_FRAGMENT = gql`
  fragment Me on User {
    id
    firstName
    lastName
    email
  }
`

export const ME = gql`
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
