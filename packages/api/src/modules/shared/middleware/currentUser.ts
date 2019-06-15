import { createParamDecorator } from "type-graphql"
import { ResolverContext } from "../../../lib/types"

export const CurrentUser = () =>
  createParamDecorator<ResolverContext>(
    ({ context }) => context.req.session && context.req.session.user,
  )
