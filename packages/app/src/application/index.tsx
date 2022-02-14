import * as React from "react"
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  fromPromise,
  gql,
  InMemoryCache,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"
import { RetryLink } from "@apollo/client/link/retry"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { StatusBar } from "expo-status-bar"

import { ThemeProvider } from "../components/ThemeProvider"
import { API_URL, REFRESH_TOKEN, SESSION_TOKEN } from "../lib/config"
import { RefreshTokenDocument, RefreshTokenQuery, RefreshTokenQueryVariables } from "../lib/graphql"
import { Screens } from "./screens"

const _ = gql`
  query RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
      refreshToken
    }
  }
`

const getRefreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN)
  if (!refreshToken) throw new Error()
  const res = await client.query<RefreshTokenQuery, RefreshTokenQueryVariables>({
    query: RefreshTokenDocument,
    fetchPolicy: "network-only",
    variables: { refreshToken },
  })
  const data = res.data
  if (!!!data || !!!data.refreshToken) throw new Error()
  const token = data?.refreshToken.token
  const newRefreshToken = data?.refreshToken.refreshToken
  await AsyncStorage.setItem(SESSION_TOKEN, token)
  await AsyncStorage.setItem(REFRESH_TOKEN, newRefreshToken)
  return { token, refreshToken: newRefreshToken }
}

const httpLink = createHttpLink({ uri: API_URL })

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(SESSION_TOKEN)
  return {
    ...headers,
    headers: { authorization: token ? `Bearer ${token}` : "" },
  }
})

const retryLink = new RetryLink()

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.message === "Expired token") {
        return fromPromise(
          getRefreshToken().catch(async () => {
            await AsyncStorage.removeItem(SESSION_TOKEN)
            await AsyncStorage.removeItem(REFRESH_TOKEN)
            return { token: null, refreshToken: null }
          }),
        )
          .filter(Boolean)
          .flatMap((res) => {
            const oldHeaders = operation.getContext().headers
            operation.setContext({
              headers: { ...oldHeaders, authorization: res.token ? `Bearer ${res.token}` : "" },
            })
            return forward(operation)
          })
      }
    }
  }
})

const client = new ApolloClient({
  link: from([retryLink, errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { errorPolicy: "all" },
    mutate: { errorPolicy: "all" },
    query: { errorPolicy: "all" },
  },
})

export default function App() {
  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <StatusBar style="auto" />
        <Screens />
      </ApolloProvider>
    </ThemeProvider>
  )
}
