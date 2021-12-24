const { getDefaultConfig } = require("expo/metro-config")
const path = require("path")
// Find the workspace root, this can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(__dirname, "../..")
const projectRoot = __dirname

const config = getDefaultConfig(projectRoot)

// allow cjs
config.resolver.sourceExts.push("cjs")

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot]
// 2. Let Metro know where to resolve packages, and in what order
config.resolver.nodeModulesPath = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
]

module.exports = config
