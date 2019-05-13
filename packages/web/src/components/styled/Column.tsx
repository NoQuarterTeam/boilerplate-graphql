import React, { FC } from "react"
import styled from "../../application/theme"

interface ColumnProps {
  flex: number
}

const Column: FC<ColumnProps> = ({ children, flex = 1 }) => {
  return <StyledColumn flex={flex}>{children}</StyledColumn>
}

export default Column

const StyledColumn = styled.div<{ flex: number }>`
  flex: ${p => p.flex};
  display: flex;
`
