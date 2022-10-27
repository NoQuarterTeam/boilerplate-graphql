export const IS_PRODUCTION = process.env.NEXT_PUBLIC_APP_ENV === "production"
export const IS_STAGING = process.env.NEXT_PUBLIC_APP_ENV === "staging"
export const IS_TEST = process.env.NEXT_PUBLIC_APP_ENV === "test"
export const IS_DEV = !IS_TEST && !IS_STAGING && !IS_PRODUCTION

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

const hostname = typeof window !== "undefined" && window?.location?.hostname

export const WEB_URL = IS_DEV ? `http://localhost:3000` : `https://${hostname}`

export const ACCESS_TOKEN = "boilerplate.access.token"
export const REFRESH_TOKEN = "boilerplate.refresh.token"

export const REFRESH_TOKEN_KEY = "refreshToken"
