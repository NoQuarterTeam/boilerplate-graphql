import cookie from "cookie"
import { useApolloClient } from "@apollo/client"
import { useRouter } from "next/router"

import { useToast } from "./useToast"
import { SESSION_TOKEN } from "../config"

export const useLogout = (redirectPath?: string) => {
  const client = useApolloClient()
  const router = useRouter()
  const toast = useToast()
  const handleLogout = async (lazyPath?: string) => {
    document.cookie = cookie.serialize(SESSION_TOKEN, "DONE", {
      maxAge: 0,
      path: "/",
    })
    await router.replace(lazyPath || redirectPath || "/")
    client.resetStore()
    toast({ description: "Successfully logged out!" })
  }
  return handleLogout
}
