import * as React from "react"
import { Box, Heading } from "@chakra-ui/react"
import Head from "next/head"

import { Layout } from "@admin/components/Layout"
import { withAuth } from "@admin/components/hoc/withAuth"
import { useMe } from "@admin/lib/hooks/useMe"

function Home() {
  const { me } = useMe()

  return (
    <Layout>
      <Head>
        <title>Admin</title>
      </Head>

      <Box>
        <Heading mb={2} fontWeight={800}>
          Hello, {me?.firstName}!
        </Heading>
      </Box>
    </Layout>
  )
}

export default withAuth(Home)
