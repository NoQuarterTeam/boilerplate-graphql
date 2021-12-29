import cookie from "cookie"
import { NextApiRequest, NextApiResponse } from "next"

import { SESSION_TOKEN } from "lib/config"

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Set-Cookie", cookie.serialize(SESSION_TOKEN, "DONE", { maxAge: 0, path: "/" }))
  res.status(200).json({ success: true })
}
