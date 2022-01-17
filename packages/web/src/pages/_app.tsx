import * as React from "react"
import { ApolloProvider } from "@apollo/client"
import { theme } from "@boilerplate/theme"
import { ChakraProvider } from "@chakra-ui/react"
import type { NextPage } from "next"
import type { AppProps } from "next/app"
import Head from "next/head"

import { useApollo } from "lib/apollo/client"
// import type { RefreshResponse } from "pages/api/refresh-token"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function BoilerplateApp(props: AppPropsWithLayout) {
  const { Component, pageProps } = props
  const apolloClient = useApollo(pageProps.initialApolloState)
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ChakraProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          {/* <RefreshToken /> */}
          {getLayout(<Component {...pageProps} />)}
        </ApolloProvider>
      </ChakraProvider>
    </>
  )
}

// function RefreshToken() {
//   React.useEffect(() => {
//     const interval = setInterval(async () => {
//       try {
//         const res = await fetch("/api/refresh-token")
//         const json: RefreshResponse = await res.json()
//         if (json.success) return
//         throw new Error()
//       } catch {
//         window.location.href = "/login"
//       }
//     }, 10000)
//     return () => {
//       clearInterval(interval)
//     }
//   }, [])
//   return null
// }
