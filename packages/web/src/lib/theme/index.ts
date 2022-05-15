import { extendTheme } from "@chakra-ui/react"

import { Button } from "./components/Button"
import { Input } from "./components/Input"
import { Select } from "./components/Select"
import { Textarea } from "./components/Textarea"

export const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
  fonts: {
    body: "Poppins, sans-serif",
    heading: "Poppins, serif",
  },
  components: {
    Button,
    Input,
    Select,
    Textarea,
  },
  colors: {
    // can override in here and pass colors thorugh as long as this theme object is passed thru the ChakraProvider
    //
    // see _app.tsx
    //
    // you will also see used in the useColorMode() hook. This is to provide light/dark modes.
    // can pass through as params so:
    //
    // useColorMode('green.50', 'green.800')
    //
    green: {
      50: "#dafff4",
      100: "#aefde2",
      200: "#80fbd0",
      300: "#50f8bf",
      400: "#22f6ac",
      500: "#09dd93",
      600: "#00ac72",
      700: "#007b50",
      800: "#004b2f",
      900: "#001b0d",
    },
  },
})
