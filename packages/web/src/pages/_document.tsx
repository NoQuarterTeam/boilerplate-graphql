import * as React from "react"
import { ColorModeScript } from "@chakra-ui/react"
import Document, { Head, Html, Main, NextScript } from "next/document"

export default class BoilerplateDocument extends Document {
  static getInitialProps(ctx: any) {
    return Document.getInitialProps(ctx)
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" key="theme-color" content="#000000" />
          <meta name="description" content="Welcome to the Boilerplate!" key="description" />
          <meta property="og:title" content="Boilerplate" key="title" />
          <meta property="og:description" content="Welcome to the Boilerplate!" key="og:description" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
            rel="stylesheet"
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
