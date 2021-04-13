import { createParamDecorator } from "type-graphql"
import { AuthenticationError } from "apollo-server-express"
import { ResolverContext } from "./resolver"

export function CurrentUser() {
  return createParamDecorator<ResolverContext>(async ({ context }) => {
    if (context.req.user) {
      const user = await context.prisma.user.findUnique({ where: { id: context.req.user.id } })
      if (!user) throw new AuthenticationError("Not authenticated")
      return user
    } else {
      throw new AuthenticationError("Not authenticated")
    }
  })
}
