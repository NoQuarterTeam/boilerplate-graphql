module.exports = {
  extends: ["./.eslintrc.js"],
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": [
      "error",
      { groups: [["^react", "^@?\\w", "^\\u0000"], ["^"], ["^lib?\\w", "^components?\\w"], ["^\\."]] },
    ],
  },
}
