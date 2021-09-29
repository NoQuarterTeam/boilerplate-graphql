module.exports = {
  extends: ["../../.eslintrc.js", "next"],
  ignorePatterns: ["./src/lib/graphql.tsx"],
  rules: {
    "jsx-a11y/anchor-is-valid": "off",
    "no-extend-native": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/prefer-interface": "off",
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-angle-bracket-type-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  settings: {
    next: {
      rootDir: "./**/src",
    },
    react: {
      version: "detect",
    },
  },
}
