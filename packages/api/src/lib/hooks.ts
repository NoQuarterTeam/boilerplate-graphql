import * as glob from "glob"

// HOOK PATHS
const HOOK_PATHS = "/modules/**/*hooks.{js,ts}"

export function loadPrismaHooks() {
  const filePaths = glob.sync(__dirname + "../../" + HOOK_PATHS)
  filePaths.forEach(require)
}
