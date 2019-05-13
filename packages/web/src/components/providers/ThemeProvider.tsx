import React, { FC, Fragment } from "react"
import useMedia from "use-media"

import { ThemeProvider as ThemeContextProvider } from "../../application/context"
import {
  theme,
  ThemeProvider as SCThemeProvider,
} from "../../application/theme"

import { useLocalStorage } from "../../lib/hooks/useLocalStorage"

const ThemeProvider: FC = ({ children }) => {
  const isSmall = useMedia({ maxWidth: 450 })
  const [isDark, setDarkTheme] = useLocalStorage("darkTheme", false)
  const toggleTheme = () => {
    setDarkTheme(!isDark)
  }
  return (
    <ThemeContextProvider value={{ toggleTheme, isDark }}>
      <SCThemeProvider theme={theme(isSmall, isDark)}>
        <Fragment>{children}</Fragment>
      </SCThemeProvider>
    </ThemeContextProvider>
  )
}

export default ThemeProvider
