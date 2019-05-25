import React from "react"
import { Switch, styled } from "@noquarter/ui"

import { useTheme } from "../application/context"

function ThemeSwitcher() {
  const { toggleTheme, isDark } = useTheme()
  return (
    <StyledSwitcher>
      <StyledLabel>Dark mode</StyledLabel>
      <Switch on={isDark} onChange={toggleTheme} />
    </StyledSwitcher>
  )
}

export default ThemeSwitcher

const StyledSwitcher = styled.div`
  display: flex;
  align-items: center;
`

const StyledLabel = styled.div`
  padding-right: ${p => p.theme.paddingM};
  color: ${p => p.theme.colorText};
`
