const baseFieldStyle = { field: { borderRadius: 0 } }

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
      field: {
        _focus: {
          borderColor: "pink.500",
        },
      },
    },
    outline: {
      field: {
        _focus: {
          borderColor: "pink.500",
        },
      },
    },
  },
  // The default `size` or `variant` values
  defaultProps: {
    variant: "filled",
  },
}
