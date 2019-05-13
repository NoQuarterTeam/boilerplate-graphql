import { useContext } from "react"
import { StateContext, ThemeContext } from "../../application/context"

export function useAppState() {
  const stateContext = useContext(StateContext)
  if (!stateContext)
    throw new Error("hook must be called under <StateProvider>")
  return {
    user: stateContext.user!, // eslint-disable-line
  }
}
export function useTheme() {
  const themeContext = useContext(ThemeContext)
  if (!themeContext)
    throw new Error("hook must be called under <ThemeProvider>")
  return themeContext
}
