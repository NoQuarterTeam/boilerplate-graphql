import { PrismaClient } from "@prisma/client"

import { ExpressContext } from "../../lib/express"

export type ResolverContext = ExpressContext & { prisma: PrismaClient }
