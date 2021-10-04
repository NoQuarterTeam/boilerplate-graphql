import * as React from "react"
import { Box, Heading, VStack } from "@chakra-ui/react"
import Head from "next/head"

import { useMe } from "lib/hooks/useMe"
import { HomeLayout } from "components/HomeLayout"
import { Limiter } from "components/Limiter"

export default function Home() {
  const { me } = useMe()

  return (
    <Box>
      <Head>
        <title>Boilerplate</title>
      </Head>

      <Limiter pt={20} minH="100vh">
        <VStack spacing={6}>
          <Heading as="h1">Welcome to the Boilerplate</Heading>
          {me && (
            <Heading as="h2" fontSize="2xl">
              Hello, {me.firstName}!
            </Heading>
          )}
        </VStack>
      </Limiter>
    </Box>
  )
}

Home.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
