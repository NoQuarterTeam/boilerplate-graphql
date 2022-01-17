import { gql } from "@apollo/client"
import type { NextApiRequest, NextApiResponse } from "next"

import { initializeApollo } from "lib/apollo/client"
import { REFRESH_TOKEN } from "lib/config"
import { createAuthCookies, removeAuthCookies } from "lib/cookies"
import type { RefreshTokenQuery, RefreshTokenQueryVariables } from "lib/graphql";
import { RefreshTokenDocument } from "lib/graphql"

const _ = gql`
  query RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
      refreshToken
    }
  }
`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = initializeApollo(null)
    const oldRefreshToken = req.cookies[REFRESH_TOKEN]
    if (!oldRefreshToken) throw new Error()
    const { data } = await client.query<RefreshTokenQuery, RefreshTokenQueryVariables>({
      query: RefreshTokenDocument,
      variables: { refreshToken: oldRefreshToken },
    })
    if (!!!data || !!!data.refreshToken) throw new Error()
    const token = data?.refreshToken.token
    const refreshToken = data?.refreshToken.refreshToken
    res.setHeader("Set-Cookie", createAuthCookies({ token, refreshToken }))
    res.status(200).json({ success: true })
  } catch {
    res.setHeader("Set-Cookie", removeAuthCookies())
    res.status(200).json({ success: false })
  }
}

export type RefreshResponse = { success: boolean }
