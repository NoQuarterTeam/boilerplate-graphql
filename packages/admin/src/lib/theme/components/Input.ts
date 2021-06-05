const baseFieldStyle = { field: {} }

export const Input = {
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
  // Styles for the visual style variations
  variants: {
    filled: {
      field: {},
    },
    outline: {
      field: {},
    },
  },
  // The default `size` or `variant` values
  defaultProps: {
    variant: "outline",
    focusBorderColor: "pink.500",
  },
}
