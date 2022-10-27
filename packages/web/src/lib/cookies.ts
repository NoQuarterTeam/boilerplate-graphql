import cookie from "cookie"

import { IS_DEV, REFRESH_TOKEN } from "./config"
import type { RefreshTokenResponse } from "./graphql"

export const createAuthCookies = ({
  refreshToken,
}: {
  refreshToken: RefreshTokenResponse["refreshToken"]
}) => [
  cookie.serialize(REFRESH_TOKEN, refreshToken, {
    path: "/",
    sameSite: "lax",
    secure: !IS_DEV,
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60, // 1month
  }),
]
export const removeAuthCookies = () => [cookie.serialize(REFRESH_TOKEN, "DONE", { maxAge: 0, path: "/" })]
