module.exports = {
  extends: ["./.eslintrc.js"],
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": ["error", { groups: [["^\\u0000"], ["^"], ["^@generated?\\w"], ["^\\."]] }],
  },
}
