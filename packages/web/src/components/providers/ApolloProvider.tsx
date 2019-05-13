import React, { FC, Fragment } from "react"
import ApolloClient from "apollo-boost"
import { ApolloProvider as ReactApolloProvider } from "react-apollo-hooks"
import { apiUrl } from "../../lib/config"

const client = new ApolloClient({
  uri: apiUrl,
  credentials: "include",
})

const ApolloProvider: FC = ({ children }) => {
  return (
    <ReactApolloProvider client={client}>
      <Fragment>{children}</Fragment>
    </ReactApolloProvider>
  )
}

export default ApolloProvider
