import React, { FC } from "react"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import { apiUrl } from "../../lib/config"

const client = new ApolloClient({
  uri: apiUrl,
  credentials: "include",
})

const AppApolloProvider: FC = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default AppApolloProvider
