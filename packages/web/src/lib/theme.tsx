import { ThemeInterface, defaultTheme } from "@noquarter/ui"

export const theme: (isDark: boolean) => ThemeInterface = isDark => ({
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    background: isDark ? "#373c3f" : "#f8f9fd",
    text: isDark ? "#ebecec" : "#1b2d41",
    tile: isDark ? "#2f3135" : "#fff",
  },
})
