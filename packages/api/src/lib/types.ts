import { Response, Request } from "express"

export interface ResolverContext {
  req: Request
  res: Response
}
