import * as React from "react"
import { ApolloProvider } from "@apollo/client"
import { ChakraProvider } from "@chakra-ui/react"
import Head from "next/head"

import { useApollo } from "lib/apollo/client"
import { theme } from "lib/theme"

export default function App(props: any) {
  const { Component, pageProps } = props
  const apolloClient = useApollo(pageProps.initialApolloState)
  const getLayout = Component.getLayout ?? ((page: any) => page)
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ChakraProvider theme={theme}>
        <ApolloProvider client={apolloClient}>{getLayout(<Component {...pageProps} />)}</ApolloProvider>
      </ChakraProvider>
    </>
  )
}
