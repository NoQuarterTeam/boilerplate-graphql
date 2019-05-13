import * as styledComponents from "styled-components"
import { ThemedStyledComponentsModule } from "styled-components"
import { generateMedia } from "styled-media-query"
import { darken, lighten } from "polished"

const media = generateMedia({
  xl: "1440px",
  lg: "1170px",
  md: "768px",
  sm: "450px",
})

const theme: (small: boolean, isDark: boolean) => ThemeInterface = (
  small,
  isDark,
) => ({
  colorPage: isDark ? "#2f3335" : "white",
  colorBackground: isDark ? "#373c3f" : "#f8f9fd",
  colorPlaceholder: isDark ? "#6f7172" : "#d3d3d3",
  colorShadow: isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(200, 200, 200, 0.1)",
  colorLabel: isDark ? "#81878a" : "#b1bbc4",
  colorText: isDark ? "#ebecec" : "#1b2d41",
  colorPink: "#ed60d3",
  colorBlue: "#4586ff",
  fontBlack: 900,
  fontBold: 400,
  fontNormal: 200,
  paddingL: "20px",
  paddingM: "10px",
  paddingS: "5px",
  paddingXL: "40px",
  paddingXS: "3px",
  borderRadius: "5px",
  textL: small ? "1.5rem" : "1.75rem",
  textM: small ? "1rem" : "1.125rem",
  textS: small ? "0.75rem" : "0.875rem",
  textXL: small ? "2rem" : "2.25rem",
  textXS: "0.625rem",
  flexCenter: `
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  flexBetween: `
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  flexAround: `
    display: flex;
    align-items: center;
    justify-content: space-around;
  `,
})

export interface ThemeInterface {
  colorPage: string
  borderRadius: string
  colorBackground: string
  colorText: string
  colorLabel: string
  colorShadow: string
  colorPlaceholder: string
  colorPink: string
  colorBlue: string
  fontBlack: number
  fontBold: number
  fontNormal: number
  paddingL: string
  paddingM: string
  paddingS: string
  paddingXL: string
  paddingXS: string
  textL: string
  textM: string
  textS: string
  textXL: string
  textXS: string
  flexCenter: string
  flexBetween: string
  flexAround: string
  [key: string]: any
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>

export {
  theme,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  media,
  darken,
  lighten,
}
export default styled
