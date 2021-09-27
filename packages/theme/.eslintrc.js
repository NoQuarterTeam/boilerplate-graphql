module.exports = {
  extends: ["../../.eslintrc.js"],
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": [
      "warn",
      { groups: [["^\\u0000"], ["^react", "^@?\\w"], ["^"], ["^lib?\\w", "^components?\\w"], ["^\\."]] },
    ],
    "jsx-a11y/anchor-is-valid": "off",
    "no-extend-native": "off",
    "@typescript-eslint/prefer-interface": "off",
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-angle-bracket-type-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
}
