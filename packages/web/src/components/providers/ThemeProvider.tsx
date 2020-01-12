import React from "react"
import {
  CSSReset,
  ThemeProvider as CThemeProvider,
  theme,
  DefaultTheme,
  ColorModeProvider,
  Box,
  useColorMode,
} from "@chakra-ui/core"
import emotionStyled, { CreateStyled } from "@emotion/styled"
import { useLocalStorage } from "@noquarter/hooks"

export const ThemeProvider: React.FC = ({ children }) => {
  const [colorMode] = useLocalStorage<"dark" | "light">(
    "fullstack:darkmode",
    "dark",
  )
  return (
    <CThemeProvider theme={theme}>
      <ColorModeProvider value={colorMode}>
        <StyledBackground>
          <CSSReset />
          {children}
        </StyledBackground>
      </ColorModeProvider>
    </CThemeProvider>
  )
}

const StyledBackground: React.FC = props => {
  const { colorMode } = useColorMode()
  return (
    <Box bg={colorMode === "dark" ? "gray.900" : "white"}>{props.children}</Box>
  )
}

export const styled = emotionStyled as CreateStyled<DefaultTheme>
