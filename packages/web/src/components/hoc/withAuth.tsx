import * as React from "react"
import { Spinner, Center } from "@chakra-ui/react"
import { useRouter } from "next/router"

import { MeFragment } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { REDIRECT_PATH } from "lib/config"

export function withAuth(Page: any, func?: (user: MeFragment) => boolean) {
  function AuthComponent(props: any) {
    const { me, loading } = useMe()
    const router = useRouter()

    React.useEffect(() => {
      if (loading) return
      if (!me || (func && !func(me))) {
        if (router.asPath === "/") {
          router.replace(`/login`)
        } else {
          router.replace(`/login?${REDIRECT_PATH}=${router.asPath}`)
        }
      }
    }, [loading, me, router])

    if (loading || !me || (func && !func(me))) {
      return (
        <Center minH="100vh">
          <Spinner />
        </Center>
      )
    }
    return <Page {...props} />
  }
  return AuthComponent
}
