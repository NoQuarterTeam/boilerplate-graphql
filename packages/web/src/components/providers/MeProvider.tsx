import React from "react"
import gql from "graphql-tag.macro"
import { MeFragmentDoc, useMeQuery, MeFragment } from "../../lib/graphql"
import { useToast } from "../../lib/hooks/useToast"

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
  ${MeFragmentDoc}
`

export const MeProvider: React.FC = ({ children }) => {
  const { data, loading, error } = useMeQuery()
  const toast = useToast()
  const me = data?.me
  React.useEffect(() => {
    if (!!error) {
      toast({ status: "error", description: "Error connecting to server" })
    }
  }, [error, toast])
  if (loading) {
    return null
  }
  return <MeContext.Provider value={me}>{children}</MeContext.Provider>
}

const MeContext = React.createContext<MeFragment | null | undefined>(undefined)

export function useMe() {
  const me = React.useContext(MeContext)
  if (!me)
    throw new Error(
      "Must be called under MeProvider and on an authenticated route",
    )
  return me
}

export function useUser() {
  return React.useContext(MeContext)
}
