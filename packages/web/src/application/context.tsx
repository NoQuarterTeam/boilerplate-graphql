import React from "react"
import { MeQuery } from "../lib/graphql/types"

export interface StateContext {
  user: MeQuery["me"]
}

export const StateContext = React.createContext<StateContext>({
  user: null,
})

export const StateProvider = StateContext.Provider

// Theme
export interface ThemeContext {
  toggleTheme: () => void
  isDark: boolean
}

export const ThemeContext = React.createContext<ThemeContext>({
  toggleTheme: () => {},
  isDark: false,
})

export const ThemeProvider = ThemeContext.Provider
