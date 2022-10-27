import * as React from "react"
import type { NormalizedCacheObject } from "@apollo/client"
import { ApolloClient, createHttpLink, from, fromPromise, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { onError } from "@apollo/client/link/error"
import { mergeDeep } from "@apollo/client/utilities"
import * as Sentry from "@sentry/nextjs"
import type { RefreshResponse } from "pages/api/refresh-token"

import { typePolicies } from "lib/apollo/pagination"
import { ACCESS_TOKEN, GRAPHQL_API_URL } from "lib/config"

export const isBrowser = () => typeof window !== "undefined"

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

const refreshToken = () => fetch("/api/refresh-token", { method: "post" })

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.extensions.code) {
        case "APP_ERROR":
          break
        case "BAD_USER_INPUT":
          Sentry.captureException(err)
          break
        case "UNAUTHENTICATED":
          return fromPromise(
            refreshToken()
              .then(async (res) => {
                const data: RefreshResponse = await res.json()
                if (data.token) {
                  window.localStorage.setItem(ACCESS_TOKEN, data.token)
                  return true
                }
                throw new Error("Refresh token failed")
              })
              .catch(() => {
                window.localStorage.removeItem(ACCESS_TOKEN)
                if (!window.location.pathname.includes("login")) {
                  window.location.href = `/login`
                }
                return true
              }),
          )
            .filter(Boolean)
            .flatMap(() => forward(operation))
        default:
          Sentry.captureException(err)
          console.error(err)
          break
      }
    }
  }
})

const httpLink = createHttpLink({ uri: GRAPHQL_API_URL })

function createApolloClient(initialState?: null | Record<string, any>) {
  const authLink = setContext((_, { headers }) => {
    const token = window.localStorage.getItem(ACCESS_TOKEN)
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  })

  return new ApolloClient({
    ssrMode: !isBrowser(),
    link: from([errorLink, authLink, httpLink]),
    name: "web",
    credentials: "include",
    defaultOptions: {
      watchQuery: { errorPolicy: "all", notifyOnNetworkStatusChange: true },
      mutate: { errorPolicy: "all" },
      query: { errorPolicy: "all", notifyOnNetworkStatusChange: true },
    },
    cache: new InMemoryCache({ typePolicies }).restore(initialState || {}),
  })
}

export function initializeApollo(initialState?: null | Record<string, any>) {
  const _apolloClient = apolloClient ?? createApolloClient(initialState)
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    const existingCache = _apolloClient.extract()
    const data = mergeDeep(initialState, existingCache)
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (!isBrowser()) return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState: any = null) {
  const store = React.useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
