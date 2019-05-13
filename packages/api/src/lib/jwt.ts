import jwt from "jsonwebtoken"
import { APP_SECRET } from "./config"

type Payload =
  | string
  | {
      [key: string]: any
    }
export const createToken = (payload: Payload): Promise<string> => {
  return new Promise(resolve => {
    try {
      const token = jwt.sign(payload, APP_SECRET, {
        issuer: "@fullstack-boilerplate/api",
        audience: ["@fullstack-boilerplate/app", "@fullstack-boilerplate/web"],
        expiresIn: "4w",
      })
      resolve(token)
    } catch (error) {
      // Oops
    }
  })
}

export function decryptToken<T>(token: string): Promise<T> {
  return new Promise(resolve => {
    try {
      jwt.verify(token, APP_SECRET)
      const payload = jwt.decode(token)
      resolve(payload as T)
    } catch (error) {
      // Oops
    }
  })
}
