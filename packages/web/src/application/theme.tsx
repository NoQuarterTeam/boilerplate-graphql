import { ThemeInterface, defaultTheme } from "@noquarter/ui"

export const theme: (small: boolean, isDark: boolean) => ThemeInterface = (
  small,
  isDark,
) => ({
  ...defaultTheme,
  boxShadow: "10px 10px 20px 0 rgba(100, 100, 100, 0.1)",
  colorBackground: isDark ? "#373c3f" : "#f8f9fd",
  colorLabel: isDark ? "#81878a" : "#b1bbc4",
  colorShadow: isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(200, 200, 200, 0.1)",
  colorText: isDark ? "#ebecec" : "#1b2d41",
  colorTile: isDark ? "#2f3135" : "#fff",
  textL: small ? "1.5rem" : "1.75rem",
  textM: small ? "1rem" : "1.125rem",
  textS: small ? "0.75rem" : "0.875rem",
  textXL: small ? "2rem" : "2.25rem",
})
