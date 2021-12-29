import { gql } from "@apollo/client"

import { useMeQuery } from "../graphql"

export const _ = gql`
  fragment Me on User {
    id
    firstName
    lastName
    email
    role
  }
`

export const __ = gql`
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
