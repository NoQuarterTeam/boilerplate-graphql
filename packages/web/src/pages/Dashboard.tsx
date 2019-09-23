import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Button, styled } from "@noquarter/ui"
import { useAppState } from "../application/context"

import { useLogout } from "../lib/graphql/user/hooks"

import Page from "../components/Page"
import ThemeSwitcher from "../components/ThemeSwitcher"

const Dashboard: FC<RouteComponentProps> = () => {
  const { user } = useAppState()
  const logout = useLogout()
  return (
    <Page>
      <div>
        <StyledHeader>
          Hello there, {user.firstName} {user.lastName}
        </StyledHeader>
        <Button onClick={logout}>Logout</Button>
      </div>
      <StyledSwitchContainer>
        <ThemeSwitcher />
      </StyledSwitchContainer>
    </Page>
  )
}

export default Dashboard

const StyledHeader = styled.h2`
  margin: ${p => p.theme.space.xl} auto;
  color: ${p => p.theme.colors.text};
`

const StyledSwitchContainer = styled.div`
  position: absolute;
  bottom: ${p => p.theme.space.xl};
  left: ${p => p.theme.space.xl};
`
