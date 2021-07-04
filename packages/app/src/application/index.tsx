import * as React from "react"
import { StatusBar } from "expo-status-bar"
import { NativeBaseProvider, extendTheme } from "native-base"
import { setContext } from "@apollo/client/link/context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Screens } from "./screens"
import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache } from "@apollo/client"
import { API_URL, SESSION_TOKEN } from "../lib/config"

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

const theme = extendTheme({ useSystemColorMode: false, initialColorMode: "light" })

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
