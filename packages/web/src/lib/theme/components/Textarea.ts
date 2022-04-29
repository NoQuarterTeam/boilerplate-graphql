const baseStyle = { borderRadius: 2 }

export const Textarea = {
  // Styles for the base style
  baseStyle: {},
  // Styles for the size variations
  sizes: {
    lg: baseStyle,
    md: baseStyle,
    sm: baseStyle,
    xs: baseStyle,
  },
  // The default `size` or `variant` values
  defaultProps: {
    variant: "filled",
    focusBorderColor: "purple.500",
  },
}
