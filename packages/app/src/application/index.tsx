import * as React from "react"
import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { StatusBar } from "expo-status-bar"
import { NativeBaseProvider } from "native-base"

import { API_URL, SESSION_TOKEN } from "../lib/config"
import { theme } from "../lib/theme"
import { Screens } from "./screens"

const httpLink = createHttpLink({ uri: API_URL })

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(SESSION_TOKEN)
  return {
    ...headers,
    headers: { authorization: token ? `Bearer ${token}` : "" },
  }
})

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: { errorPolicy: "all" },
    query: { errorPolicy: "all" },
  },
})

export function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <ApolloProvider client={client}>
        <StatusBar style="auto" />
        <Screens />
      </ApolloProvider>
    </NativeBaseProvider>
  )
}
