import { CacheHint } from "apollo-cache-control"
import { UseMiddleware } from "type-graphql"

export function CacheControl(hint: CacheHint) {
  return UseMiddleware(({ context, info }, next) => {
    context.cacheOptions = { ttl: hint.maxAge }
    info.cacheControl.setCacheHint(hint)
    return next()
  })
}
