import { useApolloClient } from "@apollo/client"
import { MeDocument } from "../graphql"

export function useLogout() {
  const client = useApolloClient()
  const handleLogout = () => {
    localStorage.removeItem("token")
    client.writeQuery({ query: MeDocument, data: { me: null } })
  }
  return handleLogout
}
