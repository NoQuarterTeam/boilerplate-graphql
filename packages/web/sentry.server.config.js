import * as Sentry from "@sentry/nextjs"

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
const NODE_ENV = process.env.NODE_ENV || "development"

Sentry.init({
  dsn: SENTRY_DSN || "https://5d0371a223bb4509902f8940cb957daf@o204549.ingest.sentry.io/5741383",
  tracesSampleRate: 2.0,
  enabled: NODE_ENV === "production",
})
