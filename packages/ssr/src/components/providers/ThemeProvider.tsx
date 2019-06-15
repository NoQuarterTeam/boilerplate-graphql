import React from "react"
import { NextFC } from "next"
import jsHttpCookie from "cookie"
import useMedia from "use-media"
import { ThemeProvider as SCThemeProvider } from "@noquarter/ui"

import { theme } from "../../lib/theme"
import { ThemeProvider as ThemeContextProvider } from "../../lib/context"
import useCookie from "../../lib/hooks/useCookie"

const ThemeProvider: NextFC<{}, { theme: string }> = ({ children }) => {
  const isSmall = useMedia({ maxWidth: 450 })
  const [themeMode, setThemeMode] = useCookie("themeMode", "light")
  const toggleTheme = () =>
    setThemeMode(themeMode === "light" ? "dark" : "light")
  return (
    <ThemeContextProvider value={{ toggleTheme, isDark: themeMode === "dark" }}>
      <SCThemeProvider theme={theme(isSmall, themeMode === "dark")}>
        {children}
      </SCThemeProvider>
    </ThemeContextProvider>
  )
}

ThemeProvider.getInitialProps = ({ req }) => {
  if (req && req.headers) {
    const cookies = req.headers.cookie
    if (typeof cookies === "string") {
      const cookiesJSON = jsHttpCookie.parse(cookies)
      return {
        theme: cookiesJSON.darkTheme,
      }
    }
  }
  return { theme: "light" }
}

export default ThemeProvider
