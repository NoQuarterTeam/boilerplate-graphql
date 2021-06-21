import * as React from "react"
import { Box, Heading } from "@chakra-ui/react"
import Head from "next/head"

import { Layout } from "components/Layout"
import { withAuth } from "components/hoc/withAuth"
import { useMe } from "lib/hooks/useMe"

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
