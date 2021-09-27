import * as glob from "glob"

import { HOOK_PATHS } from "./config"

export function loadPrismaHooks() {
  const filePaths = glob.sync(__dirname + "../../" + HOOK_PATHS)
  filePaths.forEach(require)
}
