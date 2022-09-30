// don't import files or modules into this file

if (!process.env.APP_ENV) {
  const hostname = typeof window !== "undefined" && window?.location?.hostname
  process.env.APP_ENV = "development"
  if (hostname) {
    if (hostname === "boilerplate.noquarter.co") {
      process.env.APP_ENV = "production"
    } else if (hostname.includes("noquarter")) {
      process.env.APP_ENV = "staging"
    }
  }
}

export const IS_PRODUCTION = process.env.APP_ENV === "production"
export const IS_STAGING = process.env.APP_ENV === "staging"
export const IS_DEV = process.env.APP_ENV === "development"
export const REDIRECT_PATH = "redirect"
export const REDIRECT_REFRESH_KEY = "session_expired"

export const SENTRY_DSN = "https://5d0371a223bb4509902f8940cb957daf@o204549.ingest.sentry.io/5741383"

const STAGING_URL = process.env.VERCEL_GIT_PULL_REQUEST_NUMBER
  ? `https://api-boilerplate-pr-${process.env.VERCEL_GIT_PULL_REQUEST_NUMBER}.up.railway.app`
  : "https://staging.api.boilerplate.noquarter.co"

export const API_URL = IS_PRODUCTION
  ? "https://api.boilerplate.noquarter.co"
  : IS_STAGING
  ? STAGING_URL
  : "http://localhost:5555"

export const GRAPHQL_API_URL = API_URL + "/graphql"

export const WEB_URL = IS_PRODUCTION ? "boilerplate.noquarter.co" : "localhost:3000"

export const ACCESS_TOKEN = "boilerplate.access.token"
export const REFRESH_TOKEN = "boilerplate.refresh.token"
export const LOGIN_TOKEN_KEY = "token"
export const LOGIN_REFRESH_TOKEN_KEY = "refreshToken"
