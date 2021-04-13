import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({ log: ["query", "warn", "error"] })
prisma.$connect()
