import React, { useContext } from "react"
import { MeQuery } from "./graphql/types"

interface StateContext {
  user: MeQuery["me"]
}

const StateContext = React.createContext<StateContext | undefined>(undefined)

export function useAppState() {
  const stateContext = useContext(StateContext)
  if (!stateContext)
    throw new Error("hook must be called under <StateProvider>")
  return {
    user: stateContext.user!, // eslint-disable-line
  }
}

export const StateProvider = StateContext.Provider

// Theme
interface ThemeContext {
  toggleTheme: () => void
  isDark: boolean
}

const ThemeContext = React.createContext<ThemeContext | undefined>(undefined)

export const ThemeProvider = ThemeContext.Provider

export function useTheme() {
  const themeContext = useContext(ThemeContext)
  if (!themeContext)
    throw new Error("hook must be called under <ThemeProvider>")
  return themeContext
}
