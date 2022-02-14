import { extendTheme } from "native-base"

import colors from "./colors"
import { ButtonStyles } from "./components/ButtonStyles"
import { InputStyles } from "./components/InputStyles"

export const theme = extendTheme({
  config: { initialColorMode: "light" },
  colors: { ...colors, primary: colors.purple },
  components: {
    Input: InputStyles,
    Button: ButtonStyles,
  },
})
