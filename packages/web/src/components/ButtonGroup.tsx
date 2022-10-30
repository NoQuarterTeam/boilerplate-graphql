import * as React from "react"
import type { ButtonGroupProps } from "@chakra-ui/react";
import { ButtonGroup as CButtonGroup } from "@chakra-ui/react"

export function ButtonGroup(props: ButtonGroupProps) {
  return (
    <CButtonGroup spacing={4} display="flex" justifyContent="flex-end" alignItems="center" {...props}>
      {props.children}
    </CButtonGroup>
  )
}
