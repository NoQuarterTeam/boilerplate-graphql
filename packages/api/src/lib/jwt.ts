import jwt from "jsonwebtoken"

import { APP_AUTH_SECRET, APP_SECRET } from "./config"

type Payload = Record<string, any>

export const createToken = (payload: Payload, options?: jwt.SignOptions): string => {
  try {
    const token = jwt.sign(payload, APP_SECRET, {
      issuer: "@boilerplate/api",
      audience: ["@boilerplate/app", "@boilerplate/web"],
      expiresIn: "4w",
      ...options,
    })
    return token
  } catch (error) {
    // Oops
    throw error
  }
}

export const createAuthToken = (payload: Payload): string => {
  try {
    const token = jwt.sign(payload, APP_AUTH_SECRET, {
      issuer: "@boilerplate/api",
      audience: ["@boilerplate/app", "@boilerplate/web"],
      expiresIn: "4w",
    })
    return token
  } catch (error) {
    // Oops
    throw error
  }
}

export function decryptToken<T>(token: string): T {
  try {
    jwt.verify(token, APP_SECRET)
    const payload = jwt.decode(token)
    return payload as T
  } catch (error) {
    // Oops
    throw error
  }
}
