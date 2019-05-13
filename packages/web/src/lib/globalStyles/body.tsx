import { css } from "../../application/theme"

const body = css`
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  a,
  ul,
  ol {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ul,
  ol {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  * {
    font-family: "Open sans", sans-serif;
    box-sizing: border-box;
    position: relative;
  }
`

export default body
