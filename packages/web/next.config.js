const { withSentryConfig } = require("@sentry/nextjs")
const withTM = require("next-transpile-modules")(["@boilerplate/theme"])

const sentryWebpackPluginOptions = {
  silent: true,
}
module.exports = withSentryConfig(withTM({}), sentryWebpackPluginOptions)
