import * as React from "react"
import type { ButtonProps } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react"
import NextLink from "next/link"

interface Props extends ButtonProps {
  href: string
}
export function LinkButton({ href, ...props }: Props) {
  return (
    <Button as={NextLink} href={href} textDecor="none !important" {...props}>
      {props.children}
    </Button>
  )
}
