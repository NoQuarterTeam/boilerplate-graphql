import React, { memo, ReactNode } from "react"
import { styled } from "@noquarter/ui"

interface PageProps {
  children?: ReactNode
}

function Page({ children }: PageProps) {
  return <StyledPage>{children}</StyledPage>
}

const StyledPage = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${p => p.theme.colors.background};

  ${p => p.theme.helpers.flex.center};
`

export default memo(Page)
