import type { FieldFunctionOptions, FieldPolicy } from "@apollo/client"

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
export const pagination: FieldPolicy<Response, Response, Response, FieldFunctionOptions<Args>> = {
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

export const typePolicies = {
  Query: {
    fields: {
      exports: pagination,
      innovations: pagination,
      subtrends: pagination,
      megatrends: pagination,
      macrotrends: pagination,
      industries: pagination,
      stats: pagination,
      teams: pagination,
      orders: pagination,
      invoices: pagination,
      prices: pagination,
      basicNeeds: pagination,
      plans: pagination,
      regions: pagination,
      reports: pagination,
      users: pagination,
      activity: pagination,
    },
  },
}
