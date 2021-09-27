import * as React from "react"
import { NativeBaseProvider } from "native-base"

import { theme } from "../lib/theme"

interface Props {
  children: React.ReactNode
}

export function ThemeProvider(props: Props) {
  return <NativeBaseProvider theme={theme}>{props.children}</NativeBaseProvider>
}
