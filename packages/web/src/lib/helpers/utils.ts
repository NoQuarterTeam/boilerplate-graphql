import cookie from "cookie"
import dayjs from "dayjs"
import { IncomingMessage } from "http"

export const isBrowser = typeof window !== "undefined"

export const humanize = (str: string) => {
  return str
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase()
    })
}

export const formatFileName = (filename: string): string => {
  const type = filename.split(".").pop()
  let name = filename
    .split(".")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
  name = dayjs().format("YYYYMMDDHHmmss") + "-" + name
  if (type) {
    name = name + "." + type.toLowerCase()
  }
  return name
}

export function parseCookies(req?: IncomingMessage, options = {}): Record<string, string> {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie, options)
}

export function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.substring(1)
}

export function camelToHuman(name?: string | null): string {
  if (!name) return ""
  const words = name.match(/[A-Za-z][a-z]*/g) || []
  return words.map(capitalize).join(" ")
}
