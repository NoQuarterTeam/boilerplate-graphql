import React, { memo, ButtonHTMLAttributes } from "react"
import styled, { css, ThemeInterface, lighten } from "../application/theme"
import { capitalize } from "../lib/helpers"

export type Variant = "block" | "outline" | "text"
export type Color = "primary" | "secondary" | "tertiary"
export type Size = "small" | "large"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  color?: Color
  loading?: boolean
  disabled?: boolean
  size?: Size
  full?: boolean
  style?: any
}

function Button({
  variant = "block",
  color = "primary",
  type = "submit",
  size = "large",
  loading = false,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      color={color}
      loading={loading}
      type={type}
      size={size}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? "Loading" : props.children}
    </StyledButton>
  )
}

export default memo(Button)

const blockStyles = (color: string) => css`
  background-color: ${p => p.theme["color" + capitalize(color)]};
  border: 2px solid ${p => p.theme["color" + capitalize(color)]};
`

const outlineStyled = (color: string) => css`
  background-color: transparent;
  border: 2px solid ${p => lighten(0.1, p.theme["color" + capitalize(color)])};
  color: ${p => p.theme["color" + capitalize(color)]};
`

const textStyles = (color: string, disabled: boolean) => css`
  background-color: transparent;
  border: transparent;
  color: ${p => p.theme["color" + capitalize(color)]};
  &:hover {
    ${p =>
      !disabled &&
      `background-color: ${lighten(
        0.28,
        p.theme["color" + capitalize(color)],
      )}`};
  }
`

const getVariantStyles = ({
  color = "primary",
  variant = "block",
  disabled = false,
}: ThemeInterface & ButtonProps) => {
  switch (variant) {
    case "block":
      return blockStyles(color)
    case "outline":
      return outlineStyled(color)
    case "text":
      return textStyles(color, disabled)
    default:
      return blockStyles(color)
  }
}

const StyledButton = styled.button<ButtonProps>`
  text-align: center;
  color: white;
  letter-spacing: 1px;
  line-height: 20px;
  margin: ${p => p.theme.paddingS};
  transition: 200ms all;
  font-size: ${p => p.theme.textM};
  cursor: ${p => (p.disabled ? "default" : "pointer")};
  width: ${p => (!p.full ? "auto" : "100%")};
  opacity: ${p => (p.disabled ? 0.5 : 1)};
  border-radius: ${p => p.theme.borderRadius};
  ${p => p.theme.flexCenter};
  padding: ${p =>
    p.size === "large"
      ? `${p.theme.paddingM} ${p.theme.paddingXL}`
      : `${p.theme.paddingS} ${p.theme.paddingL}`};

  &:hover {
    opacity: ${p => (p.disabled ? 0.5 : 0.7)};
  }

  ${p => getVariantStyles({ ...p, ...p.theme })}
`
