import { AuthenticationError } from "apollo-server-express"
import { createMethodDecorator } from "type-graphql"

import { Role } from "@generated"

import { ResolverContext } from "../../shared/resolverContext"

export function UseIsCurrentUser(): any {
  return createMethodDecorator<ResolverContext>(async ({ context: { req }, root }, next) => {
    if (!req.currentUser) throw new AuthenticationError("Not authenticated")
    if (req.currentUser.role === Role.ADMIN) return next()
    if (req.currentUser.id !== root.id) throw new AuthenticationError("Not authorized")
    return next()
  })
}
