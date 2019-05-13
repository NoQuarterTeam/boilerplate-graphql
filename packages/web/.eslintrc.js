module.exports = {
  extends: ["react-app", "plugin:react/recommended", "../../.eslintrc.js"],
  rules: {
    "jsx-a11y/anchor-is-valid": "off",
    "no-extend-native": "off",
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
