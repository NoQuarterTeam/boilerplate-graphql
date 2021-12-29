import { useApolloClient } from "@apollo/client"
import { useRouter } from "next/router"

import { useToast } from "./useToast"

export const useLogout = (redirectPath?: string) => {
  const client = useApolloClient()
  const router = useRouter()
  const toast = useToast()
  const handleLogout = async (lazyPath?: string) => {
    await fetch("/api/logout", { method: "post" })
    await router.replace(lazyPath || redirectPath || "/")
    client.resetStore()
    toast({ description: "Successfully logged out!" })
  }
  return handleLogout
}
