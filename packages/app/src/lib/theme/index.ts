import { extendTheme } from "native-base"

import colors from "./colors"
import { ButtonStyles } from "./components/ButtonStyles"
import { InputStyles } from "./components/InputStyles"

export const theme = extendTheme({
  colors: { ...colors, primary: colors.purple },
  config: { initialColorMode: "light" },
  components: {
    Toast: {
      baseStyle: { w: "500px" },
    },
    Input: InputStyles,
    Button: ButtonStyles,
  },
})
