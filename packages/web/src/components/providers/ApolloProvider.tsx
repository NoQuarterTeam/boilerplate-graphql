import React from "react"
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider as ReactApolloProvider,
  concat,
  ApolloLink,
} from "@apollo/client"

import { apiUrl } from "../../lib/config"

const httpLink = new HttpLink({
  uri: apiUrl,
})

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token")
  operation.setContext({
    headers: {
      authorization: (token && `Bearer ${token}`) || null,
    },
  })

  return forward(operation)
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      errorPolicy: "all",
    },
  },
})

export const ApolloProvider: React.FC = ({ children }) => {
  return <ReactApolloProvider client={client}>{children}</ReactApolloProvider>
}
