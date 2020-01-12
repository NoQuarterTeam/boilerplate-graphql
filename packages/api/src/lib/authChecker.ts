import { AuthChecker } from "type-graphql"
import { ResolverContext } from "../modules/shared/context/resolver"

export const authChecker: AuthChecker<ResolverContext> = async ({
  context: { req },
}) => {
  if (req?.user?.id) {
    return true
  } else {
    return false
  }
}
