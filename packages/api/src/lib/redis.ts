import Redis from "ioredis"

import { REDIS_URL } from "./config"

export const redis = new Redis(REDIS_URL)
