import * as React from "react"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { Spinner, Center } from "@chakra-ui/react"
import { useMe } from "lib/hooks/useMe"
import { REDIRECT_PATH } from "lib/config"

export const withNoAuth = (App: NextPage, redirectUrl?: string) => {
  function NoAuthComponent(props: any) {
    const { me, loading } = useMe()
    const router = useRouter()
    const redirect = router.query[REDIRECT_PATH] as string | undefined

    React.useEffect(() => {
      if (loading || !me) return
      router.replace(redirectUrl || redirect || "/")
    }, [loading, me, router, redirect])

    if (loading || me)
      return (
        <Center minH="100vh">
          <Spinner />
        </Center>
      )
    return <App {...props} />
  }

  return NoAuthComponent
}
