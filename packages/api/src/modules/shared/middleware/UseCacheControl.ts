import { CacheHint } from "apollo-server-types"
import { UseMiddleware } from "type-graphql"

export function UseCacheControl(hint: CacheHint) {
  return UseMiddleware(({ info }, next) => {
    info.cacheControl.setCacheHint(hint)
    return next()
  })
}
