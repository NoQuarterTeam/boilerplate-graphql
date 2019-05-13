import { AuthChecker } from "type-graphql"
import { ResolverContext } from "../lib/types"

export const authChecker: AuthChecker<ResolverContext> = async ({
  context: { req },
}) => {
  if (req.session && req.session.user) {
    return true
  } else {
    return false
  }
}
