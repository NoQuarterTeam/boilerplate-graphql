import jwt from "jsonwebtoken"

import { APP_AUTH_SECRET, APP_REFRESH_SECRET, APP_SECRET } from "./config"

type Payload = Record<string, any>

export const createToken = (payload: Payload, options?: jwt.SignOptions): string => {
  const token = jwt.sign(payload, APP_SECRET, {
    issuer: "@boilerplate/api",
    audience: ["@boilerplate/app", "@boilerplate/web"],
    expiresIn: "4w",
    ...options,
  })
  return token
}

export function decodeToken<T>(token: string): T {
  jwt.verify(token, APP_SECRET)
  const payload = jwt.decode(token)
  return payload as T
}

export const createAuthToken = (payload: Payload): string => {
  const token = jwt.sign(payload, APP_AUTH_SECRET, {
    issuer: "@boilerplate/api",
    audience: ["@boilerplate/app", "@boilerplate/web"],
    expiresIn: "1 min",
  })
  return token
}
export const createRefreshToken = (payload: Payload): string => {
  const token = jwt.sign(payload, APP_REFRESH_SECRET, {
    issuer: "@boilerplate/api",
    audience: ["@boilerplate/app", "@boilerplate/web"],
    expiresIn: "4 weeks",
  })
  return token
}

export function decodeRefreshToken<T>(token: string): T {
  jwt.verify(token, APP_REFRESH_SECRET)
  const payload = jwt.decode(token)
  return payload as T
}
