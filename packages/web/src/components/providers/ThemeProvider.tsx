import React, { FC } from "react"
import useMedia from "use-media"
import { ThemeProvider as SCThemeProvider } from "@noquarter/ui"

import { theme } from "../../application/theme"
import { ThemeProvider as ThemeContextProvider } from "../../application/context"

import { useLocalStorage } from "../../lib/hooks/useLocalStorage"

const ThemeProvider: FC = ({ children }) => {
  const isSmall = useMedia({ maxWidth: 450 })
  const [isDark, setDarkTheme] = useLocalStorage("darkTheme", false)
  const toggleTheme = () => setDarkTheme(!isDark)
  return (
    <ThemeContextProvider value={{ toggleTheme, isDark }}>
      <SCThemeProvider theme={theme(isSmall, isDark)}>
        {children}
      </SCThemeProvider>
    </ThemeContextProvider>
  )
}

export default ThemeProvider
