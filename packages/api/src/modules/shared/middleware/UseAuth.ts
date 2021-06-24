import { createMethodDecorator } from "type-graphql"
import { AuthenticationError } from "apollo-server-express"
import { prisma } from "../../../lib/prisma"
import { ResolverContext } from "../resolverContext"

export function UseAuth(roles?: string[]): any {
  return createMethodDecorator<ResolverContext>(async ({ context: { req } }, next) => {
    const argRoles = roles || []
    if (req?.user?.id) {
      const currentUser = await prisma.user.findUnique({ where: { id: req.user.id } })
      if (!currentUser) throw new AuthenticationError("Not authorized")
      if (argRoles.length === 0) return next()
      if (argRoles.includes(currentUser.role)) return next()
      throw new AuthenticationError("Not authorized")
    } else {
      throw new AuthenticationError("Not authenticated")
    }
  })
}
