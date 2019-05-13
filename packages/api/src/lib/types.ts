import { Request, Response } from "express"

export interface ResolverContext {
  req: AppRequest
  res: Response
  userId: string
}

export interface AppRequest extends Request {
  user?: { id: string }
}
