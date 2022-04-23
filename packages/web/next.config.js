const { withSentryConfig } = require("@sentry/nextjs")

const sentryWebpackPluginOptions = {
  silent: true,
}
module.exports = withSentryConfig({ reactStrictMode: false }, sentryWebpackPluginOptions)
