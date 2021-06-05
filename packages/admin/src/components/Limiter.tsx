import * as React from "react"
import { Box, BoxProps } from "@chakra-ui/react"

export const Limiter: React.FC<BoxProps & { size?: "sm" | "md" | "lg" }> = ({ size = "md", ...props }) => {
  const px = {
    base: 4,
    md: 10,
    lg: 24,
    xl: size === "sm" ? 24 : size === "md" ? 48 : 64,
  }
  return <Box w="100%" px={px} {...props} />
}
