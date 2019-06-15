import React, { FC } from "react"
import { styled } from "@noquarter/ui"

interface SpacerProps {
  margin?: any
}
const Spacer: FC<SpacerProps> = ({ children, margin = 10 }) => {
  return <StyledSpacer style={{ margin }}>{children}</StyledSpacer>
}

export default Spacer

const StyledSpacer = styled.div`
  width: 100%;
`
