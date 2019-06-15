module.exports = {
  extends: ["react-app", "plugin:react/recommended", "../../.eslintrc.js"],
  plugins: ["react-hooks"],
  rules: {
    "jsx-a11y/anchor-is-valid": "off",
    "no-extend-native": "off",
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/prefer-interface": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
