module.exports = {
  extends: ["../../.eslintrc.js"],
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": ["warn", { groups: [["^\\u0000"], ["^"], ["^@generated?\\w"], ["^\\."]] }],
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/ban-types": "off",
  },
}
