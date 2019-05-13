import React from "react"
import useAppContext from "../lib/hooks/useAppContext"
import Switch from "./Switch"
import styled from "../application/theme"

function ThemeSwitcher() {
  const { toggleTheme, isDark } = useAppContext()
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
