import { useContext } from "react"

import { StateContext, ThemeContext } from "../../application/context"
import { useApolloClient } from "react-apollo-hooks"

function useAppContext() {
  const client = useApolloClient()
  const { toggleTheme, isDark } = useContext(ThemeContext)
  const { user } = useContext(StateContext)
  return {
    user: user!, // eslint-disable-line
    toggleTheme: toggleTheme!, // eslint-disable-line
    isDark: isDark!, // eslint-disable-line
    client,
  }
}

export default useAppContext
