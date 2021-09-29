import * as React from "react"
import { Center, Spinner } from "@chakra-ui/react"
import { NextPage } from "next"
import { useRouter } from "next/router"

import { REDIRECT_PATH } from "lib/config"
import { useMe } from "lib/hooks/useMe"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}
export const withNoAuth = (Page: NextPageWithLayout, redirectUrl?: string) => {
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
    return <Page {...props} />
  }

  const getPageLayout = Page.getLayout ?? ((page: React.ReactElement) => page)
  NoAuthComponent.getLayout = (page: React.ReactElement) => <>{getPageLayout(page)}</>

  return NoAuthComponent
}
