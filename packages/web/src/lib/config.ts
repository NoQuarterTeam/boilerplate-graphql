// don't import files or modules into this file
const { APP_ENV } = process.env
let env: "production" | "development"

if (APP_ENV) {
  env = APP_ENV as "production" | "development"
} else {
  const hostname = typeof window !== "undefined" && window?.location?.hostname
  if (hostname) {
    if (hostname.includes("fullstack-boilerplate")) {
      env = "production"
    } else {
      env = "development"
    }
  } else {
    env = "development"
  }
}

export const IS_PRODUCTION = env === "production"
export const IS_DEV = !IS_PRODUCTION

export const SENTRY_DSN = "https://c33dca4b2027454da1c39d5bda0c7a4c@o204549.ingest.sentry.io/5527138"
export const API_URL = IS_PRODUCTION
  ? "https://fullstack-boilerplate.herokuapp.com/graphql"
  : "http://localhost:5000/graphql"

export const WEB_URL = IS_PRODUCTION ? "fullstack-boilerplate.co" : "localhost:3000"

export const SESSION_TOKEN = "fullstack.boilerplate.token"
