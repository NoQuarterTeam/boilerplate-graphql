import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: "light",
  },
})
