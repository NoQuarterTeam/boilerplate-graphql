"use client"
import * as React from "react"
import { ApolloProvider } from "@apollo/client"
import { ChakraProvider } from "@chakra-ui/react"
import { Inter } from "@next/font/google"

import { useApollo } from "lib/apollo/client"
import { theme } from "lib/theme"

const font = Inter({ subsets: ["latin"] })

export default function Layout({ children }: { children: React.ReactNode }) {
  const client = useApollo()
  return (
    <html lang="en" className={font.className}>
      <head>
        <meta name="theme-color" key="theme-color" content="#000000" />
        <meta name="description" content="Welcome to the Boilerplate!" key="description" />
        <meta property="og:title" content="Boilerplate" key="title" />
        <meta property="og:description" content="Welcome to the Boilerplate!" key="og:description" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ fontFamily: "Inter, sans-serif" }}>
        <ChakraProvider theme={theme}>
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </ChakraProvider>
      </body>
    </html>
  )
}
