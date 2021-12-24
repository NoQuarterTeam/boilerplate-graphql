function roundedStyle() {
  return {
    borderRadius: "pill",
    fontSize: "xl",
    borderWidth: 2,
  }
}
function outlineStyle() {
  return { borderWidth: 2, fontSize: "xl" }
}
function filledStyle(props: Record<string, any>) {
  return {
    bg: props.bg || "muted.200",
    borderWidth: 2,
    fontSize: "xl",
    borderColor: "transparent",
    _hover: { bg: "muted.300" },
  }
}
function unstyledStyle() {
  return { borderWidth: 0, fontSize: "xl" }
}
function underlinedStyle() {
  return {
    fontSize: "xl",
    borderRadius: 0,
    borderBottomWidth: 2,
  }
}

const variants = {
  outline: outlineStyle,
  underlined: underlinedStyle,
  rounded: roundedStyle,
  filled: filledStyle,
  unstyled: unstyledStyle,
}

export const InputStyles = {
  variants,
  defaultProps: {
    variant: "filled",
  },
}
