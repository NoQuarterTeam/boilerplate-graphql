import { AuthChecker } from "type-graphql"
import { ResolverContext } from "../lib/types"

export const authChecker: AuthChecker<ResolverContext> = async ({
  context: { userId },
}) => {
  if (!userId) {
    return false
  } else {
    return true
  }
}
