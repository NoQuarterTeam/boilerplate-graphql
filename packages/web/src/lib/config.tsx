let env: string

const hostname = window?.location?.hostname
if (hostname === "www.fullstackboilerplate.co") {
  env = "production"
} else {
  env = "development"
}

export const environment = env

export const production = env === "production"

export const apiUrl = production
  ? "https://api.fullstackboilerplate.co/graphql"
  : "http://localhost:5555/graphql"

export const webUrl = production
  ? "https://www.fullstackboilerplate.co"
  : "http://localhost:3000"
