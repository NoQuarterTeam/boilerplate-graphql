import { Platform } from "react-native"
type Dict = Record<any, any>
const mode = (light: any, dark: any) => light
const disabledTextColor = (props: any) => mode(`muted.500`, `muted.300`)

const baseStyle = (props: any) => {
  const { primary } = props.theme.colors
  const focusRing = Platform.OS === "web" ? { boxShadow: `${primary[400]} 0px 0px 0px 3px` } : {}

  return {
    borderRadius: "lg",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    _web: {
      cursor: props.isDisabled ? "not-allowed" : props.isLoading ? "default" : "pointer",
    },
    _text: {
      fontWeight: 600,
      color: "white",
    },
    _focusVisible: {
      style: props.variant !== "unstyled" ? { ...focusRing } : {},
    },
    _stack: {
      space: 2,
      alignItems: "center",
    },
    _disabled: {
      opacity: 0.5,
    },
  }
}

function variantGhost(props: Dict) {
  const { colorScheme: c } = props
  if (c === "muted") {
    return {
      _text: {
        color: disabledTextColor(props),
      },
    }
  }
  return {
    _text: {
      color: props.isDisabled ? disabledTextColor(props) : mode(`${c}.500`, `${c}.200`),
    },
    bg: "transparent",
    _web: {
      outlineWidth: 0,
    },
    _pressed: {
      bg: mode(`${c}.200`, `${c}.500`),
    },
  }
}

function variantOutline(props: Dict) {
  const { colorScheme: c } = props
  const borderColor = mode(`muted.200`, `muted.500`)
  return {
    border: "1px solid",
    borderColor:
      c === "muted"
        ? borderColor
        : props.isDisabled
        ? disabledTextColor(props)
        : mode(`${c}.300`, `${c}.600`),
    ...variantGhost(props),
  }
}

type AccessibleColor = {
  bg?: string
  color?: string
}

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  yellow: {
    bg: "yellow.400",
    color: "black",
  },
  cyan: {
    bg: "cyan.400",
    color: "black",
  },
}

function variantSolid(props: Dict) {
  const { colorScheme: c } = props
  let { bg = `${c}.500`, color = "white" } = accessibleColorMap[c] || {}
  bg = mode(bg, `${c}.400`)
  if (props.isDisabled) {
    bg = mode(`muted.300`, `muted.500`)
    color = "gray.700"
  }

  const styleObject = {
    _web: {
      outlineWidth: 0,
    },
    _text: {
      color: props.isDisabled ? disabledTextColor(props) : color,
    },
    bg,
    _hover: {
      bg: mode(`${c}.600`, `${c}.500`),
    },
    _pressed: {
      bg: mode(`${c}.700`, `${c}.600`),
    },
  }

  return styleObject
}

function variantLink(props: Dict) {
  const { colorScheme: c } = props

  return {
    ...variantGhost(props),
    _text: {
      // textDecorationLine: 'underline',
      color:
        c === "muted"
          ? mode(`muted.800`, `${c}.200`)
          : props.isDisabled
          ? disabledTextColor(props)
          : mode(`${c}.500`, `${c}.200`),
    },
    _hover: {
      _text: {
        textDecorationLine: "underline",
      },
    },
    _ios: {
      _text: {
        textDecorationLine: "underline",
      },
    },
    _android: {
      _text: {
        textDecorationLine: "underline",
      },
    },
  }
}

function variantUnstyled() {
  return {}
}

const variants = {
  ghost: variantGhost,
  outline: variantOutline,
  solid: variantSolid,
  link: variantLink,
  unstyled: variantUnstyled,
}

const sizes = {
  lg: {
    px: 6,
    py: 3,
    _text: {
      fontSize: "lg",
    },
  },
  md: {
    px: 4,
    py: 3,
    _text: {
      fontSize: "md",
    },
  },
  sm: {
    px: 4,
    py: 2,
    _text: {
      fontSize: "sm",
    },
  },
  xs: {
    px: 2,
    py: 1,
    _text: {
      fontSize: "xs",
    },
  },
}

const defaultProps = {
  variant: "solid",
  size: "md",
  colorScheme: "primary",
}

export const ButtonGroup = {
  baseStyle: { direction: "row" },
  defaultProps: { space: 2 },
}

export const ButtonStyles = {
  baseStyle,
  variants,
  sizes,
  defaultProps,
}
