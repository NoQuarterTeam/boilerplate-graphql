// don't import files or modules into this file
const { APP_ENV } = process.env
let env = APP_ENV as "production" | "development"

if (!env) {
  const hostname = typeof window !== "undefined" && window?.location?.hostname
  env = "development"
  if (hostname) {
    if (hostname.includes("boilerplate")) {
      env = "production"
    }
  }
}

export const IS_PRODUCTION = env === "production"
export const IS_DEV = !IS_PRODUCTION

export const SENTRY_DSN = "https://5d0371a223bb4509902f8940cb957daf@o204549.ingest.sentry.io/5741383"

export const GRAPHQL_API_URL = IS_PRODUCTION
  ? "https://api-production-bf46.up.railway.app/graphql"
  : "http://localhost:5555/graphql"

// export const API_URL = IS_PRODUCTION ? "https://boilerplate.graphcdn.app" : "http://localhost:5555/graphql"
export const API_URL = IS_PRODUCTION
  ? "https://api-production-bf46.up.railway.app"
  : "http://localhost:5555/graphql"

export const WEB_URL = IS_PRODUCTION ? "boilerplate.noquarter.co" : "localhost:3000"

export const ACCESS_TOKEN = "boilerplate.access.token"
export const REFRESH_TOKEN = "boilerplate.refresh.token"
export const LOGIN_TOKEN_KEY = "token"
export const LOGIN_REFRESH_TOKEN_KEY = "refreshToken"
