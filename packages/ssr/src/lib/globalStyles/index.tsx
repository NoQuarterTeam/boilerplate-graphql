import { createGlobalStyle } from "@noquarter/ui"

import body from "./body"
import overides from "./overides"

export default createGlobalStyle`
  ${body}
  ${overides}
`
