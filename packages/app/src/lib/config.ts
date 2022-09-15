// don't import files or modules into this file
const { NODE_ENV } = process.env

export const IS_PRODUCTION = NODE_ENV === "production"
export const IS_DEV = NODE_ENV === "development"

export const SENTRY_DSN = "https://5d0371a223bb4509902f8940cb957daf@o204549.ingest.sentry.io/5741383"

// export const API_URL = IS_PRODUCTION
//   ? "https://boilerplate.graphcdn.app"
//   : "http://192.168.68.125:5555/graphql"

export const API_URL = IS_PRODUCTION
  ? "https://api-production-bf46.up.railway.app/graphql"
  : "http://localhost:5555/graphql"
//NOTE: when trying to connect on real device, change the the above localhost to your computers ip address

export const WEB_URL = IS_PRODUCTION ? "boilerplate.noquarter.co" : "localhost:3000"

export const SESSION_TOKEN = "boilerplate.session.token"
export const REFRESH_TOKEN = "boilerplate.refresh.token"
