import React from "react"
import { Button, styled } from "@noquarter/ui"

import Page from "../components/Page"
import Router from "next/router"
import { useAppState } from "../lib/context"

function Home() {
  const { user } = useAppState()
  if (user) return Router.push("/dashboard")
  return (
    <Page>
      <div>
        <StyledHeader>Welcome to the Fullstack Boilerplate!</StyledHeader>
        <Button onClick={() => Router.push("/login")}>Login</Button>
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
