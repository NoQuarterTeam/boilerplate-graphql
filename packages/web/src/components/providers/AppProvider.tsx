import React from "react"
import { ThemeProvider } from "./ThemeProvider"
import { ApolloProvider } from "./ApolloProvider"
import { MeProvider } from "./MeProvider"

export const AppProvider: React.FC = ({ children }) => {
  return (
    <ApolloProvider>
      <ThemeProvider>
        <MeProvider>{children}</MeProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}
