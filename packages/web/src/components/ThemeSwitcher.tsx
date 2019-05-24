import React from "react"
import styled from "../application/theme"
import { useTheme } from "../application/context"

import Switch from "./Switch"

function ThemeSwitcher() {
  const { toggleTheme, isDark } = useTheme()
  return (
    <StyledSwitcher>
      <StyledLabel>Dark mode</StyledLabel>
      <Switch on={isDark} handleClick={toggleTheme} />
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
