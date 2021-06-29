import { CacheHint } from "apollo-cache-control"
import { UseMiddleware } from "type-graphql"

export function UseCacheControl(hint: CacheHint) {
  return UseMiddleware(({ info }, next) => {
    info.cacheControl.setCacheHint(hint)
    return next()
  })
}
