const { withSentryConfig } = require("@sentry/nextjs")

const sentryWebpackPluginOptions = {
  silent: true,
}
module.exports = withSentryConfig(
  {
    reactStrictMode: false,
    env: {
      VERCEL_GIT_PULL_REQUEST_NUMBER: process.env.VERCEL_GIT_PULL_REQUEST_NUMBER,
    },
  },
  sentryWebpackPluginOptions,
)
