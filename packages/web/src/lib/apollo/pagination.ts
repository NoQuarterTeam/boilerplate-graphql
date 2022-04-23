import type { FieldPolicy } from "@apollo/client"

type Response = {
  items: any[]
  count: number
} | null

type Args = {
  skip?: number
  take?: number
  where?: any
  orderBy?: any
}
export const pagination: FieldPolicy<Response, Response, Args> = {
  keyArgs: ["orderBy", "where"],
  merge(existing, incoming, { args }) {
    if (args && !args.skip) return incoming
    if (!existing) return null
    if (!incoming) return existing
    return {
      count: incoming.count,
      items: [...existing.items, ...incoming.items],
    }
  },
}
