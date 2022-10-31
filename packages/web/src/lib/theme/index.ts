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
  // fonts: {
  //   body: "Oswald, sans-serif",
  //   heading: "Oswald, sans-serif",
  // },
  components: {
    Button,
    Input,
    Select,
    Textarea,
  },
})
