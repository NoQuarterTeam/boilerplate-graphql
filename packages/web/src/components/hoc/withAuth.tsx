import * as React from "react"
import { Spinner, Center } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { NextPage } from "next"

import { MeFragment } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { REDIRECT_PATH } from "lib/config"

export function withAuth(Page: NextPage, isAuthorized?: (user: MeFragment) => boolean) {
  function AuthComponent(props: any) {
    const { me, loading } = useMe()
    const router = useRouter()

    React.useEffect(() => {
      if (loading) return
      if (!me) {
        // If not logged in
        let url = "/login"
        if (router.asPath !== "/") url += `?${REDIRECT_PATH}=${router.asPath}`
        router.replace(url)
        return
      }
      if (isAuthorized && !isAuthorized(me)) {
        // If not authorized
        router.replace("/")
        return
      }
    }, [loading, me, router])

    if (loading || !me || (isAuthorized && !isAuthorized(me))) {
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
