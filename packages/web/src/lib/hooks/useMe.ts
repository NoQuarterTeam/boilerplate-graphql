import { gql } from "@apollo/client"

import { MeFragmentDoc, useMeQuery } from "lib/graphql"

export const ME_FRAGMENT = gql`
  fragment Me on User {
    id
    firstName
    lastName
    fullName
    avatar
    email
    role
  }
`

export const ME = gql`
  query Me {
    me {
      ...Me
    }
  }
  ${MeFragmentDoc}
`

export function useMe() {
  const res = useMeQuery()
  return { me: res.data?.me, ...res }
}
