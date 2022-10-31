import { useApolloClient } from "@apollo/client"
import { useRouter } from "next/navigation"

import { useToast } from "./useToast"

export const useLogout = () => {
  const client = useApolloClient()
  const router = useRouter()
  const toast = useToast()
  const handleLogout = async () => {
    router.replace("/logout")
    await fetch("/api/logout", { method: "post" })
    await client.resetStore()
    toast({ description: "Successfully logged out!" })
  }
  return handleLogout
}
