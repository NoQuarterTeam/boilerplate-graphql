function roundedStyle() {
  return {
    borderRadius: "pill",
    borderWidth: 2,
  }
}
function outlineStyle() {
  return { borderWidth: 2 }
}
function filledStyle(props: Record<string, any>) {
  return {
    bg: props.bg || "muted.200",
    borderWidth: 2,
    borderColor: "transparent",
    _hover: { bg: "muted.300" },
  }
}
function unstyledStyle() {
  return { borderWidth: 0 }
}
function underlinedStyle() {
  return {
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
