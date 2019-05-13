import jwt from "jsonwebtoken"
import { APP_SECRET } from "./config"

export const createToken = (userId: string): Promise<string> => {
  return new Promise(resolve => {
    try {
      const token = jwt.sign({ id: userId }, APP_SECRET, {
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

export function decryptToken(token: string): Promise<any> {
  return new Promise(resolve => {
    try {
      jwt.verify(token, APP_SECRET)
      const payload = jwt.decode(token)
      resolve(payload)
    } catch (error) {
      // Oops
    }
  })
}
