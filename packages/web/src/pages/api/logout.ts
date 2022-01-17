import type { NextApiRequest, NextApiResponse } from "next"

import { removeAuthCookies } from "lib/cookies"

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Set-Cookie", removeAuthCookies())
  res.status(200).json({ success: true })
}
