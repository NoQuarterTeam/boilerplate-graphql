// ENV VARIABLES
export const {
  NODE_ENV = "development",
  APP_SECRET = "APP_SECRET",
  PORT = 5000,
  DATABASE_URL = "",
  REDIS_URL = "",
} = process.env

// IS PRODUCTION
export const isProduction = NODE_ENV === "production"

// WEB URL
export const webUrl = isProduction
  ? "https://www.production-url.com"
  : "http://localhost:3000"

// CORS
export const cors = {
  credentials: false,
  origin: "*",
}

// GRAPHQL PATH
export const path = "/graphql"

// RESOLVER PATHS
export const resolverPaths = isProduction
  ? "/modules/**/*.resolver.js"
  : "/modules/**/*.resolver.ts"
