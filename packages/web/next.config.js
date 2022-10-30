const { withSentryConfig } = require("@sentry/nextjs")

const sentryWebpackPluginOptions = {
  silent: true,
}
/**
 * @type {import('next').NextConfig}
 */
module.exports = withSentryConfig(
  {
    reactStrictMode: false,
    env: {
      NEXT_PUBLIC_PULL_REQUEST_NUMBER: process.env.VERCEL_GIT_PULL_REQUEST_NUMBER,
      NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    },
  },
  sentryWebpackPluginOptions,
)
