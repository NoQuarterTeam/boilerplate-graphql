import * as React from "react"
import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client"
import { mergeDeep } from "@apollo/client/utilities"

export const isBrowser = () => typeof window !== "undefined"

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

const httpLink = createHttpLink({ uri: "/api/graphql" })

function createApolloClient(initialState: null | Record<string, any>) {
  return new ApolloClient({
    ssrMode: !isBrowser(),
    link: httpLink,
    name: "web",
    credentials: "include",
    defaultOptions: {
      watchQuery: { errorPolicy: "all" },
      mutate: { errorPolicy: "all" },
      query: { errorPolicy: "all" },
    },
    cache: new InMemoryCache().restore(initialState || {}),
  })
}

export function initializeApollo(initialState: null | Record<string, any>) {
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
