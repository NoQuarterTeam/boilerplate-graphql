import { AuthenticationError } from "apollo-server-express"
import { createParamDecorator } from "type-graphql"

import { ResolverContext } from "./resolverContext"

export function CurrentUser() {
  return createParamDecorator<ResolverContext>(async ({ context }) => {
    if (context.req.currentUser) {
      return context.req.currentUser
    } else {
      throw new AuthenticationError("Not authenticated")
    }
  })
}
