import * as React from "react"
import { gql } from "@apollo/client"

import { MeFragmentDoc, useMeQuery, MeFragment } from "lib/graphql"

export const ME_FRAGMENT = gql`
  fragment Me on User {
    id
    firstName
    lastName
    fullName
    email
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

export const MeProvider: React.FC = ({ children }) => {
  const { data, loading } = useMeQuery()
  const me = data?.me

  if (loading && !data) return null
  return <MeContext.Provider value={me}>{children}</MeContext.Provider>
}

const MeContext = React.createContext<MeFragment | null | undefined>(undefined)

export function useMe() {
  return React.useContext(MeContext)
}
