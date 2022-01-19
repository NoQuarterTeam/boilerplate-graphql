import cookie from "cookie"

import { ACCESS_TOKEN,IS_PRODUCTION, REFRESH_TOKEN } from "./config"
import type { RefreshTokenResponse } from "./graphql"

export const createAuthCookies = ({ token, refreshToken }: RefreshTokenResponse) => [
  cookie.serialize(ACCESS_TOKEN, token, {
    path: "/",
    sameSite: "lax",
    secure: IS_PRODUCTION,
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60, // 1month
  }),
  cookie.serialize(REFRESH_TOKEN, refreshToken, {
    path: "/",
    sameSite: "lax",
    secure: IS_PRODUCTION,
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60, // 1month
  }),
]
export const removeAuthCookies = () => [
  cookie.serialize(ACCESS_TOKEN, "DONE", { maxAge: 0, path: "/" }),
  cookie.serialize(REFRESH_TOKEN, "DONE", { maxAge: 0, path: "/" }),
]
