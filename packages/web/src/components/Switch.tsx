import React, { memo } from "react"
import styled from "../application/theme"

interface SwitchProps {
  handleClick: () => void
  on: boolean
}

function Switch({ handleClick, on }: SwitchProps) {
  const handleKeyDown = (e: any) => {
    if (e.key === "Space") handleClick()
  }

  return (
    <StyledSwitch
      type="button"
      onKeyDown={handleKeyDown}
      aria-checked={on}
      onClick={handleClick}
      on={on}
    >
      <StyledToggle on={on} />
    </StyledSwitch>
  )
}

export default memo(Switch)

const StyledSwitch = styled.button<{ on: boolean }>`
  width: 32px;
  height: 20px;
  border-radius: 20px;
  outline: 0;
  padding: 0 2px;
  transition: 200ms all;
  background-color: ${p => (p.on ? p.theme.colorPrimary : p.theme.colorLabel)};

  &:hover,
  &:focus {
    box-shadow: 0 0 5px 1px rgba(0, 0, 10, 0.1);
  }
`

const StyledToggle = styled.div<{ on: boolean }>`
  position: absolute;
  top: 2px;
  left: 2px;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  transition: 200ms all;
  background-color: white;

  transform: ${p => (p.on ? "translateX(12px)" : "translateX(0)")};
`
