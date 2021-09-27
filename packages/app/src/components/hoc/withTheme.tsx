import * as React from "react"

import { ThemeProvider } from "../ThemeProvider"

export function withTheme(Screen: any) {
  function Component(props: any) {
    return (
      <ThemeProvider>
        <Screen {...props} />
      </ThemeProvider>
    )
  }
  return Component
}
