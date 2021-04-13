import { User } from "@prisma/client"
import { createParamDecorator } from "type-graphql"
import { ResolverContext } from "./resolver"

export function ContextUser() {
  return createParamDecorator<ResolverContext>(async ({ context }) => {
    if (context.req.user) {
      const user = await context.prisma.user.findUnique({ where: { id: context.req.user.id } })
      return user
    } else {
      return null
    }
  })
}
export type ContextUser = User | null
