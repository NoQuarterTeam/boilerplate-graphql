import { withSentry } from "@sentry/nextjs"
import type { NextApiRequest, NextApiResponse } from "next"

import { REFRESH_TOKEN_KEY } from "lib/config"
import { createAuthCookies } from "lib/cookies"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const refreshToken = JSON.parse(req.body)[REFRESH_TOKEN_KEY]
  if (!refreshToken) return res.status(500).json({ success: false })
  res.setHeader("Set-Cookie", createAuthCookies({ refreshToken }))
  res.status(200).json({ success: true })
}

export default withSentry(handler)
