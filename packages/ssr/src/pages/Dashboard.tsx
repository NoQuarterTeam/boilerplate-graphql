import React from "react"
import Router from "next/router"
import { Button, styled } from "@noquarter/ui"

import { useLogout } from "../lib/graphql/user/hooks"

import Page from "../components/Page"
import ThemeSwitcher from "../components/ThemeSwitcher"
import { useAppState } from "../lib/context"

function Dashboard() {
  const { user } = useAppState()
  const logout = useLogout()

  const handleLogout = () => {
    logout().then(() => {
      Router.push("/login")
    })
  }
  if (!user) {
    Router.replace("/login")
    return null
  }
  return (
    <Page>
      <div>
        <StyledHeader>
          Hello there, {user.firstName} {user.lastName}
        </StyledHeader>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <StyledSwitchContainer>
        <ThemeSwitcher />
      </StyledSwitchContainer>
    </Page>
  )
}

export default Dashboard

const StyledHeader = styled.h2`
  margin: ${p => p.theme.paddingXL} auto;
  color: ${p => p.theme.colorText};
`

const StyledSwitchContainer = styled.div`
  position: absolute;
  bottom: ${p => p.theme.paddingXL};
  left: ${p => p.theme.paddingXL};
`
