import * as React from "react"
import { Spinner, Center } from "@chakra-ui/react"
import { useRouter } from "next/router"
import type { NextPage } from "next"

import { Role } from "lib/graphql"
import { useMe } from "lib/hooks/useMe"
import { AdminLayout } from "components/AdminLayout"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

export function withAdmin(Page: NextPageWithLayout) {
  function AdminComponent(props: any) {
    const { me, loading } = useMe()
    const router = useRouter()

    React.useEffect(() => {
      if (loading) return
      if (!me || me.role !== Role.Admin) {
        router.replace(`/`)
      }
    }, [loading, me, router])

    if (loading || !me || me.role !== Role.Admin) {
      return (
        <Center minH="100vh">
          <Spinner />
        </Center>
      )
    }
    return <Page {...props} />
  }

  const getPageLayout = Page.getLayout ?? ((page: React.ReactElement) => page)
  AdminComponent.getLayout = (page: React.ReactElement) => <AdminLayout>{getPageLayout(page)}</AdminLayout>
  return AdminComponent
}
