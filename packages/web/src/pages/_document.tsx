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
