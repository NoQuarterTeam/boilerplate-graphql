import { createParamDecorator } from "type-graphql"
import { AuthenticationError } from "apollo-server-express"
import { ResolverContext } from "./resolver"
import { User } from "../../user/user.entity"

export function CurrentUser() {
  return createParamDecorator<ResolverContext>(async ({ context }) => {
    if (context.req.user) {
      const user = await User.createQueryBuilder()
        .where({ id: context.req.user.id })
        .cache(true)
        .getOne()
      if (!user) throw new AuthenticationError("Not authenticated")
      return user
    } else {
      throw new AuthenticationError("Not authenticated")
    }
  })
}
