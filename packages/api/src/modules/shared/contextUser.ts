import { createParamDecorator } from "type-graphql"

import { User } from "../user/user.model"
import { ResolverContext } from "./resolverContext"

export function ContextUser() {
  return createParamDecorator<ResolverContext>(async ({ context }) => {
    return context.req.currentUser
  })
}
export type ContextUser = User | null
