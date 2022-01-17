import type { NextApiRequest, NextApiResponse } from "next"

import { LOGIN_REFRESH_TOKEN_KEY, LOGIN_TOKEN_KEY } from "lib/config"
import { createAuthCookies } from "lib/cookies"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = JSON.parse(req.body)[LOGIN_TOKEN_KEY]
  const refreshToken = JSON.parse(req.body)[LOGIN_REFRESH_TOKEN_KEY]
  if (!token || !refreshToken) return res.status(500).json({ success: false })
  res.setHeader("Set-Cookie", createAuthCookies({ token, refreshToken }))
  res.status(200).json({ success: true })
}
