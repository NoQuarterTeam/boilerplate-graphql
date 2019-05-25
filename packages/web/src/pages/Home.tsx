import React, { FC } from "react"
import { RouteComponentProps, navigate } from "@reach/router"
import { Button } from "@noquarter/ui"

import styled from "../application/theme"
import Page from "../components/Page"

const Home: FC<RouteComponentProps> = () => {
  return (
    <Page>
      <div>
        <StyledHeader>Welcome to the Fullstack Boilerplate!</StyledHeader>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </Page>
  )
}

export default Home

const StyledHeader = styled.h2`
  font-size: ${p => p.theme.textL};
  margin-bottom: ${p => p.theme.paddingL};
  color: ${p => p.theme.colorText};
`
