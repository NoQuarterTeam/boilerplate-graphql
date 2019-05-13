import { createGlobalStyle } from "../../application/theme"
import body from "./body"
import overides from "./overides"

export default createGlobalStyle`
  ${body}
  ${overides}
`
