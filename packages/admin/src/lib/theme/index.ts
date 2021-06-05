import { extendTheme } from "@chakra-ui/react"
import { Input } from "./components/Input"

export const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
  components: {
    Input,
  },
})
