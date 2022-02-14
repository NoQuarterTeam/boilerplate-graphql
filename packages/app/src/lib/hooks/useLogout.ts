import { useApolloClient } from "@apollo/client"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { REFRESH_TOKEN, SESSION_TOKEN } from "../config"
import { MeDocument } from "../graphql"

export const useLogout = () => {
  const client = useApolloClient()

  const handleLogout = async () => {
    await AsyncStorage.removeItem(SESSION_TOKEN)
    await AsyncStorage.removeItem(REFRESH_TOKEN)
    client.writeQuery({ query: MeDocument, data: { me: null } })
  }
  return handleLogout
}
