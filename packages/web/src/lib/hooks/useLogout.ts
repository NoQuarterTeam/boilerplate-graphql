import { useApolloClient } from "@apollo/client"
import cookie from "cookie"
import { useRouter } from "next/router"

import { SESSION_TOKEN } from "../config"
import { useToast } from "./useToast"

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
