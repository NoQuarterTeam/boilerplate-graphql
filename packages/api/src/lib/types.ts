import { Response } from "express"
import { User } from "../modules/user/user.entity"

export interface ResolverContext {
  req: AppRequest
  res: Response
}

interface Session {
  user: User
  destroy(callback: (err: any) => void): void
}

export interface AppRequest {
  session: Session
}
