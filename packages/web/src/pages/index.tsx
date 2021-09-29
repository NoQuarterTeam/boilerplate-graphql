import * as React from "react"
import { Box, Center, Heading, VStack } from "@chakra-ui/react"
import Head from "next/head"

import { useMe } from "lib/hooks/useMe"
import { HomeLayout } from "components/HomeLayout"

export default function Home() {
  const { me } = useMe()

  return (
    <Box>
      <Head>
        <title>Boilerplate</title>
      </Head>

      <Center pt={20}>
        <VStack spacing={6}>
          <Heading as="h1">Welcome to the Boilerplate</Heading>
          {me && (
            <Heading as="h2" fontSize="2xl">
              Hello, {me.firstName}!
            </Heading>
          )}
        </VStack>
      </Center>
    </Box>
  )
}

Home.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
