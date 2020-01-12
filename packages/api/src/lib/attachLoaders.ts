import * as glob from "glob"
import { LOADER_PATHS } from "./config"

export const attachLoaders = () => {
  const filePaths = glob.sync(__dirname + "../../" + LOADER_PATHS)
  const modules = filePaths.map(require)

  return modules.reduce((acc, loader) => {
    Object.entries(loader).map(([key, handler]: [string, any]) => {
      acc[key] = handler()
    })
    return acc
  }, {})
}
