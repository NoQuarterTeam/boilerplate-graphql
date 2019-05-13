// ENV VARIABLES
export const {
  NODE_ENV = "development",
  APP_SECRET = "APP_SECRET",
  PORT = 5000,
  S3_BUCKET_NAME = "S3_BUCKET",
  SENDGRID_API_KEY = "SENDGRID_API_KEY",
  DATABASE_URL = "",
  REDIS_URL = "",
} = process.env

// IS PRODUCTION
export const isProduction = NODE_ENV === "production"

// WEB URL
export const webUrl = isProduction
  ? "https://production.com"
  : "http://localhost:3000"

// CORS
export const cors = {
  credentials: true,
  origin: webUrl,
}

// GRAPHQL PATH
export const path = "/graphql"

// RESOLVER PATHS
export const resolverPaths = isProduction
  ? "/modules/**/*.resolver.js"
  : "/modules/**/*.resolver.ts"

// DEV EMAIL
export const devEmailOptions: any = {
  host: "localhost",
  port: 1025,
  secure: false,
  debug: true,
  ignoreTLS: true,
}

// S3
export const s3Config = {
  signatureVersion: "v4",
  region: "eu-central-1",
}

// SESSION

export const cookieName = "fullstack.cookie"

export const sessionConfig = {
  name: cookieName,
  secret: APP_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
  },
}
