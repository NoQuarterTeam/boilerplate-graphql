module.exports = {
  transform: {
    "^.+\\.tsx?$": "<rootDir>/test-setup.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  setupFilesAfterEnv: ["react-testing-library/cleanup-after-each"],
}
