import { ResolverData } from "type-graphql"
import { ExpressContext } from "../../../lib/types"
import { Loaders } from "./loaders"

export type ResolverContext = ExpressContext & { loaders: Loaders }

export type AbilityContext = ResolverData<ResolverContext>
