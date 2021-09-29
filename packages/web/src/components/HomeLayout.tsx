import * as React from "react"
import { Box } from "@chakra-ui/layout"

import { Limiter } from "./Limiter"
import { Nav } from "./Nav"

interface Props {
  children: React.ReactNode
}

export function HomeLayout(props: Props) {
  return (
    <Box>
      <Nav />
      <Limiter pt="65px">{props.children}</Limiter>
    </Box>
  )
}
