import React from "react"
import NextApp, { Container } from "next/app"
import { ApolloProvider } from "react-apollo-hooks"
import { ApolloProvider as RApolloProvider } from "react-apollo"

import withApollo from "../lib/withApollo"
import GlobalStyles from "../lib/globalStyles"
import StateProvider from "../components/providers/StateProvider"
import ThemeProvider from "../components/providers/ThemeProvider"

class App extends NextApp<any> {
  render() {
    const { Component, pageProps, apollo } = this.props
    return (
      <Container>
        <GlobalStyles />
        <ThemeProvider>
          <RApolloProvider client={apollo}>
            <ApolloProvider client={apollo}>
              <StateProvider>
                <Component {...pageProps} />
              </StateProvider>
            </ApolloProvider>
          </RApolloProvider>
        </ThemeProvider>
      </Container>
    )
  }
}

export default withApollo(App)
