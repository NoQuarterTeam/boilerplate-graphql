import { gql } from "@apollo/client"
import * as Sentry from "@sentry/nextjs"
import { withSentry } from "@sentry/nextjs"
import type { NextApiRequest, NextApiResponse } from "next"

import { initializeApollo } from "lib/apollo/client"
import { REFRESH_TOKEN } from "lib/config"
import { createAuthCookies, removeAuthCookies } from "lib/cookies"
import type { RefreshTokenQuery, RefreshTokenQueryVariables } from "lib/graphql"
import { RefreshTokenDocument } from "lib/graphql"

const _ = gql`
  query RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
      refreshToken
    }
  }
`

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = initializeApollo()
    const oldRefreshToken = req.cookies[REFRESH_TOKEN]
    if (!oldRefreshToken) {
      res.setHeader("Set-Cookie", removeAuthCookies())
      return res.status(200).json({ token: null })
    }
    const { data } = await client.query<RefreshTokenQuery, RefreshTokenQueryVariables>({
      query: RefreshTokenDocument,
      fetchPolicy: "network-only",
      variables: { refreshToken: oldRefreshToken },
    })
    if (!!!data || !!!data.refreshToken) {
      res.setHeader("Set-Cookie", removeAuthCookies())
      return res.status(200).json({ token: null })
    }
    const token = data?.refreshToken.token
    const refreshToken = data?.refreshToken.refreshToken
    res.setHeader("Set-Cookie", createAuthCookies({ refreshToken }))
    res.status(200).json({ token })
  } catch (e) {
    Sentry.captureException(e)
    res.setHeader("Set-Cookie", removeAuthCookies())
    res.status(200).json({ token: null })
  }
}
export default withSentry(handler)
export type RefreshResponse = { token: string | null }
