import * as React from "react"
import { Center, Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"

import { useMe } from "lib/hooks/useMe"

export default function Logout() {
  const { me } = useMe()
  const router = useRouter()
  React.useEffect(() => {
    if (!me) router.replace("/")
  }, [me, router])
  return (
    <Center h="100vh">
      <Spinner />
    </Center>
  )
}
