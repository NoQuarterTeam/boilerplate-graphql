import { NextApiRequest, NextApiResponse } from "next"
import httpProxyMiddleware from "next-http-proxy-middleware"

import { API_URL, SESSION_TOKEN } from "lib/config"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies[SESSION_TOKEN]
  return httpProxyMiddleware(req, res, {
    target: API_URL,
    headers: { authorization: token ? `Bearer ${token}` : "" },
    pathRewrite: [{ patternStr: "/api/graphql", replaceStr: "" }],
  })
}
