// ENV VARIABLES
export const {
  NODE_ENV = "development",
  APP_ENV = "development",
  APP_SECRET = "APP_SECRET",
  APOLLO_KEY = "APOLLO_KEY",
  APP_AUTH_SECRET = "APP_AUTH_SECRET",
  SENTRY_DSN = "SENTRY_DSN",
  SENDGRID_API_KEY = "SENDGRID_API_KEY",
  AWS_S3_BUCKET = "S3_BUCKET",
  PORT = 5000,
  DATABASE_URL = "",
  WEB_URL = "localhost:3001",
  REDIS_URL = "",
} = process.env

// IS PRODUCTION
export const IS_PRODUCTION = APP_ENV === "production"

//  JWT AUTH
export const JWT_AUTH = {
  secret: APP_AUTH_SECRET,
  credentialsRequired: false,
  algorithms: ["HS256"],
}

// GRAPHQL PATH
export const GRAPHQL_PATH = "/graphql"

// RESOLVER PATHS
export const RESOLVER_PATHS = "/modules/**/*resolver.{js,ts}"

// HOOK PATHS
export const HOOK_PATHS = "/modules/**/*hooks.{js,ts}"

// WEB URL
export const FULL_WEB_URL = `${IS_PRODUCTION ? "https://" : "http://"}${WEB_URL}`

// S3
export const S3_CONFIG = {
  signatureVersion: "v4",
  region: "eu-central-1",
}

export const S3_URL = `https://${AWS_S3_BUCKET}.s3.amazonaws.com/`

// DEV EMAIL
export const DEV_EMAIL_OPTIONS: any = {
  host: "localhost",
  port: 1025,
  secure: false,
  debug: true,
  ignoreTLS: true,
}
