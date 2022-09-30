import * as React from "react"
import type { NormalizedCacheObject } from "@apollo/client"
import { ApolloClient, createHttpLink, from, fromPromise, InMemoryCache } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { mergeDeep } from "@apollo/client/utilities"
import * as Sentry from "@sentry/nextjs"
import type { RefreshResponse } from "pages/api/refresh-token"

import { typePolicies } from "lib/apollo/pagination"
import { GRAPHQL_API_URL, REDIRECT_PATH, REDIRECT_REFRESH_KEY } from "lib/config"
export const isBrowser = () => typeof window !== "undefined"

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

const refreshToken = () => fetch("/api/refresh-token", { method: "post" })

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.extensions.code) {
        case "BAD_USER_INPUT":
          Sentry.captureException(err)
        case "UNAUTHENTICATED":
          return fromPromise(
            refreshToken()
              .then(async (res) => {
                const data: RefreshResponse = await res.json()
                if (data.success) return true
                window.location.href = `/login?${REDIRECT_REFRESH_KEY}=true&${REDIRECT_PATH}=${window.location.pathname}`
                return false
              })
              .catch(() => forward(operation)),
          )
            .filter(Boolean)
            .flatMap(() => forward(operation))
      }
    }
  }
})

const httpLink = createHttpLink({ uri: isBrowser() ? "/api/graphql" : GRAPHQL_API_URL })

function createApolloClient(initialState?: null | Record<string, any>) {
  return new ApolloClient({
    ssrMode: !isBrowser(),
    link: from([errorLink, httpLink]),
    name: "web",
    credentials: "include",
    defaultOptions: {
      watchQuery: { errorPolicy: "all" },
      mutate: { errorPolicy: "all" },
      query: { errorPolicy: "all" },
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
