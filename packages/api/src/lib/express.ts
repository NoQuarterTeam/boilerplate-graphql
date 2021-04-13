import { Request, Response } from "express"

export interface ExpressRequest extends Request {
  user?: { id: string }
}

export interface ExpressContext {
  req: ExpressRequest
  res: Response
}
