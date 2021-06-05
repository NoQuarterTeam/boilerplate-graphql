import * as React from "react"
import { ButtonGroup as CButtonGroup, ButtonGroupProps } from "@chakra-ui/react"

export const ButtonGroup: React.FC<ButtonGroupProps> = (props) => (
  <CButtonGroup spacing={4} display="flex" justifyContent="flex-end" alignItems="center" {...props}>
    {props.children}
  </CButtonGroup>
)
