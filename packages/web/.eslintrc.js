module.exports = {
  extends: ["react-app", "plugin:react/recommended", "../../.eslintrc.js"],
  plugins: ["react-hooks"],
  rules: {
    "jsx-a11y/anchor-is-valid": "off",
    "no-extend-native": "off",
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/prefer-interface": "off",
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-angle-bracket-type-assertion": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
