import React, { memo, ReactNode } from "react"
import styled from "../application/theme"

interface PageProps {
  children: ReactNode
}

function Page({ children }: PageProps) {
  return <StyledPage>{children}</StyledPage>
}

const StyledPage = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${p => p.theme.colorPage};

  ${p => p.theme.flexCenter};
`

export default memo(Page)
