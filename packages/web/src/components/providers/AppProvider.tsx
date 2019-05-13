import React, { FC } from "react"
import ThemeProvider from "./ThemeProvider"
import ApolloProvider from "./ApolloProvider"
import StateProvider from "./StateProvider"

const AppProvider: FC = ({ children }) => {
  return (
    <ApolloProvider>
      <ThemeProvider>
        <StateProvider>{children}</StateProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default AppProvider
