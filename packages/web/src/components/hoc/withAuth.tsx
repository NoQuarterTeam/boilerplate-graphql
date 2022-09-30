import * as React from "react"
import { Center, Spinner } from "@chakra-ui/react"
import type { NextPage } from "next"
import { useRouter } from "next/router"

import type { MeFragment } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

export function withAuth(Page: NextPageWithLayout, isAuthorized?: (user: MeFragment) => boolean) {
  function AuthComponent(props: any) {
    const { me, loading } = useMe()
    const router = useRouter()

    React.useEffect(() => {
      if (loading) return
      if (!me) {
        // If not logged in
        router.replace("/login")
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Page {...props} />
  }
  const getPageLayout = Page.getLayout ?? ((page: React.ReactElement) => page)
  AuthComponent.getLayout = (page: React.ReactElement) => <>{getPageLayout(page)}</>
  return AuthComponent
}
