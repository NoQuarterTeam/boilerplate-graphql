import { ExpressRequest } from "./express"
import { prisma } from "./prisma"

export async function currentUser(req: ExpressRequest, __: any, next: any) {
  if (req.user) {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } })
    if (user) {
      req.currentUser = user
    }
  }
  return next()
}
