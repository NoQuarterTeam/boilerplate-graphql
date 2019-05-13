import React, { FC, Fragment } from "react"
import ApolloClient from "apollo-boost"
import { ApolloProvider as ReactApolloProvider } from "react-apollo-hooks"
import { apiUrl } from "../../lib/config"

const client = new ApolloClient({
  uri: apiUrl,
  request: async operation => {
    const token = await localStorage.getItem("token")
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    })
  },
})

const ApolloProvider: FC = ({ children }) => {
  return (
    <ReactApolloProvider client={client}>
      <Fragment>{children}</Fragment>
    </ReactApolloProvider>
  )
}

export default ApolloProvider
