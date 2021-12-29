import * as React from "react"
import { Box, Center, Heading } from "@chakra-ui/react"
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

      <Limiter pt={20} minH="calc(100vh - 65px)">
        <Center flexDir="column">
          <Heading as="h1" mb={4} textAlign="center">
            Welcome to the Boilerplate
          </Heading>
          {me && (
            <Heading as="h2" fontSize="2xl">
              Hello, {me.firstName}!
            </Heading>
          )}
        </Center>
      </Limiter>
    </Box>
  )
}

Home.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
