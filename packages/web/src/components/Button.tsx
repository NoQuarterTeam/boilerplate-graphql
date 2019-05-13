import React, { memo, ButtonHTMLAttributes } from "react"
import styled, { css, ThemeInterface, lighten } from "../application/theme"
import { capitalize } from "../lib/helpers"

export type Variant = "primary" | "secondary" | "tertiary"
export type Color = "blue" | "pink" | "header"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  color?: Color
  loading?: boolean
  disabled?: boolean
  full?: boolean
}

function Button({
  variant = "primary",
  color = "blue",
  loading = false,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      color={color}
      loading={loading}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? "Loading" : props.children}
    </StyledButton>
  )
}

export default memo(Button)

const primaryStyles = (color: string) => css`
  padding: ${p => `${p.theme.paddingM} ${p.theme.paddingXL}`};
  background-color: ${p => p.theme["color" + capitalize(color)]};
`

const secondaryStyles = (color: string) => css`
  background-color: transparent;
  padding: ${p => `${p.theme.paddingM} ${p.theme.paddingXL}`};
  border: 2px solid ${p => lighten(0.25, p.theme["color" + capitalize(color)])};
  color: ${p => p.theme["color" + capitalize(color)]};
`

const tertiaryStyles = (color: string) => css`
  background-color: transparent;
  color: ${p => p.theme["color" + capitalize(color)]};
`

const getVariantStyles = ({
  color = "blue",
  variant = "primary",
}: ThemeInterface & ButtonProps) => {
  switch (variant) {
    case "primary":
      return primaryStyles(color)
    case "secondary":
      return secondaryStyles(color)
    case "tertiary":
      return tertiaryStyles(color)
    default:
      return primaryStyles(color)
  }
}

const StyledButton = styled.button<ButtonProps>`
  outline: 0;
  letter-spacing: 1px;
  color: white;
  text-align: center;
  border-radius: 100px;
  font-size: ${p => p.theme.textM};
  margin: ${p => (p.full ? 0 : p.theme.paddingS)};
  cursor: ${p => (p.disabled ? "not-allowed" : "pointer")};
  width: ${p => (!p.full ? "auto" : "100%")};
  opacity: ${p => (p.disabled ? 0.5 : 1)};

  &:focus,
  &:hover {
    opacity: ${p => (p.disabled ? 0.5 : 0.7)};
  }

  ${p => getVariantStyles({ ...p, ...p.theme })}
`
