import { PrismaClient } from "@prisma/client"
import { ResolverData } from "type-graphql"
import { ExpressContext } from "../../lib/express"

export type ResolverContext = ExpressContext & { prisma: PrismaClient }

export type AbilityContext = ResolverData<ResolverContext>
