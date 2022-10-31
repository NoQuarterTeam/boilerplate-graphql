"use client"
import { Box } from "@chakra-ui/react"

import { Limiter } from "components/Limiter"
import { Nav } from "components/Nav"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Nav />
      <Limiter>{children}</Limiter>
    </Box>
  )
}
