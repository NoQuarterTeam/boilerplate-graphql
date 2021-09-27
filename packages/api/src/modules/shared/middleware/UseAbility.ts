import { GraphQLResolveInfo } from "graphql"
import { UseMiddleware } from "type-graphql"
import { Middleware } from "type-graphql/dist/interfaces/Middleware"

import { ResolverContext } from "../resolverContext"

export interface AbilityContext<Data> {
  root: any
  args: Data
  context: ResolverContext
  info: GraphQLResolveInfo
}

export function UseAbility(ability: Middleware<any>) {
  return UseMiddleware(ability)
}
