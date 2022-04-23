const baseFieldStyle = { field: { borderRadius: 2 } }

export const Select = {
  parts: ["field", "addon"],
  // Styles for the base style
  baseStyle: {},
  // Styles for the size variations
  sizes: {
    lg: baseFieldStyle,
    md: baseFieldStyle,
    sm: baseFieldStyle,
    xs: baseFieldStyle,
  },
  // The default `size` or `variant` values
  defaultProps: {
    variant: "filled",
    focusBorderColor: "purple.500",
  },
}
