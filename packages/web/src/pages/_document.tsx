import * as React from "react"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import { ColorModeScript } from "@chakra-ui/react"

export default class Document extends NextDocument {
  static getInitialProps(ctx: any) {
    return NextDocument.getInitialProps(ctx)
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="theme-color" key="theme-color" content="#000000" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <meta name="description" content="Welcome to the Fullstack boilerplate!" key="description" />
          <meta property="og:title" content="Fullstack boilerplate" key="title" />
          <meta
            property="og:description"
            content="Welcome to the Fullstack boilerplate!"
            key="og:description"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode="light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
