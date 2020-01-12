// ENV VARIABLES
export const {
  NODE_ENV = "development",
  APP_ENV = "development",
  APP_SECRET = "APP_SECRET",
  APP_AUTH_SECRET = "APP_AUTH_SECRET",
  PORT = 5555,
  AWS_S3_BUCKET = "",
  SENDGRID_API_KEY = "",
  DATABASE_URL = "",
  WEB_URL = "localhost:3000",
  REDIS_URL = "",
} = process.env

// IS PRODUCTION
export const IS_PRODUCTION = APP_ENV === "production"
export const IS_STAGING = APP_ENV === "staging"

// CORS
export const CORS_OPTIONS = {
  origin: "*",
}

// GRAPHQL PATH
export const GRAPHQL_PATH = "/graphql"

// RESOLVER PATHS
export const RESOLVER_PATHS =
  IS_PRODUCTION || IS_STAGING
    ? "/modules/**/*.resolver.js"
    : "/modules/**/*.resolver.ts"

// LOADER PATHS
export const LOADER_PATHS =
  IS_PRODUCTION || IS_STAGING
    ? "/modules/**/*.loader.js"
    : "/modules/**/*.loader.ts"

// CONTROLLER PATHS
export const CONTROLLER_PATHS =
  IS_PRODUCTION || IS_STAGING
    ? "/modules/**/*.controller.js"
    : "/modules/**/*.controller.ts"

// DEV EMAIL
export const DEV_EMAIL_OPTIONS: any = {
  host: "localhost",
  port: 1025,
  secure: false,
  debug: true,
  ignoreTLS: true,
}

//  JWT AUTH
export const jwtAuth = {
  secret: APP_AUTH_SECRET,
  credentialsRequired: false,
}

// S3
export const S3_CONFIG = {
  signatureVersion: "v4",
  region: "eu-central-1",
}
export const S3_URL = `https://${AWS_S3_BUCKET}.s3.amazonaws.com/`

// WEB URL
export const FULL_WEB_URL = () => {
  const protocol = IS_PRODUCTION ? "https://" : "http://"
  return `${protocol}.${WEB_URL}`
}
