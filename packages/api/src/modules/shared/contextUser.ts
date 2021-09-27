import { User } from "@prisma/client"
import { createParamDecorator } from "type-graphql"

import { ResolverContext } from "./resolverContext"

export function ContextUser() {
  return createParamDecorator<ResolverContext>(async ({ context }) => {
    return context.req.currentUser
  })
}
export type ContextUser = User | null
