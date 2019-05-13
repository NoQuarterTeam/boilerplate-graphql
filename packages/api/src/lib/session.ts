import connectRedis from "connect-redis"
import expressSession from "express-session"
import { redis } from "./redis"
import { sessionConfig } from "./config"

const SessionStore = connectRedis(expressSession)
const store = new SessionStore({ client: redis as any })

export const session = expressSession({ ...sessionConfig, store })
