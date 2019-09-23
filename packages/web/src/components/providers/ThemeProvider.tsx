import React, { FC } from "react"
import { useLocalStorage } from "@noquarter/hooks"
import { ThemeProvider as SCThemeProvider } from "@noquarter/ui"

import { theme } from "../../lib/theme"
import { ThemeProvider as ThemeContextProvider } from "../../application/context"

const ThemeProvider: FC = ({ children }) => {
  const [isDark, setDarkTheme] = useLocalStorage("darkTheme", false)
  const toggleTheme = () => setDarkTheme(!isDark)
  return (
    <ThemeContextProvider value={{ toggleTheme, isDark }}>
      <SCThemeProvider theme={theme(isDark)}>{children}</SCThemeProvider>
    </ThemeContextProvider>
  )
}

export default ThemeProvider
