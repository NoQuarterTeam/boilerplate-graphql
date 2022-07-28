import * as React from "react"
import { Center, Spinner } from "@chakra-ui/react"
import type { NextPage } from "next"
import { useRouter } from "next/router"

import { useMe } from "lib/hooks/useMe"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}
export const withNoAuth = (Page: NextPageWithLayout, redirectUrl?: string) => {
  function NoAuthComponent(props: any) {
    const { me, loading } = useMe()
    const router = useRouter()

    React.useEffect(() => {
      if (loading || !me) return
      router.replace(redirectUrl || "/")
    }, [loading, me, router])

    if (loading || me)
      return (
        <Center minH="100vh">
          <Spinner />
        </Center>
      )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Page {...props} />
  }

  const getPageLayout = Page.getLayout ?? ((page: React.ReactElement) => page)
  NoAuthComponent.getLayout = (page: React.ReactElement) => <>{getPageLayout(page)}</>

  return NoAuthComponent
}
