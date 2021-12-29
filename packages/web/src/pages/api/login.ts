import cookie from "cookie"
import { NextApiRequest, NextApiResponse } from "next"

import { IS_PRODUCTION,LOGIN_TOKEN_KEY, SESSION_TOKEN } from "lib/config"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = JSON.parse(req.body)[LOGIN_TOKEN_KEY]
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(SESSION_TOKEN, token, {
      path: "/",
      sameSite: "lax",
      secure: IS_PRODUCTION,
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    }),
  )
  res.status(200).json({ success: true })
}
