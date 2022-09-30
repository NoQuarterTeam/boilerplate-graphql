// don't import files or modules into this file
const ENV = process.env

let APP_ENV = ENV?.APP_ENV as "production" | "staging" | "development" | undefined

if (!APP_ENV) {
  const hostname = typeof window !== "undefined" && window?.location?.hostname
  APP_ENV = "development"
  if (hostname) {
    if (hostname.includes("boilerplate.noquarter.co")) {
      APP_ENV = "production"
    } else if (hostname.includes("noquarter.vercel.app")) {
      APP_ENV = "staging"
    }
  }
}

export const IS_PRODUCTION = APP_ENV === "production"
export const IS_STAGING = APP_ENV === "staging"
export const IS_DEV = APP_ENV === "development"
export const REDIRECT_PATH = "redirect"
export const REDIRECT_REFRESH_KEY = "session_expired"

export const SENTRY_DSN = "https://5d0371a223bb4509902f8940cb957daf@o204549.ingest.sentry.io/5741383"

const PR = ENV?.VERCEL_GIT_PULL_REQUEST_NUMBER

const STAGING_URL = PR
  ? `https://api-boilerplate-pr-${PR}.up.railway.app`
  : "https://staging.api.boilerplate.noquarter.co"

export const API_URL = IS_PRODUCTION
  ? "https://api.boilerplate.noquarter.co"
  : IS_STAGING
  ? STAGING_URL
  : "http://localhost:5555/graphql"

export const GRAPHQL_API_URL = API_URL + "/graphql"

export const WEB_URL = IS_PRODUCTION ? "boilerplate.noquarter.co" : "localhost:3000"

export const ACCESS_TOKEN = "boilerplate.access.token"
export const REFRESH_TOKEN = "boilerplate.refresh.token"
export const LOGIN_TOKEN_KEY = "token"
export const LOGIN_REFRESH_TOKEN_KEY = "refreshToken"
