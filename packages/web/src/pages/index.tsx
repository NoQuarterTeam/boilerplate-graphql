import * as React from "react"
import { gql } from "@apollo/client"
import { Box, Center, Heading, Spinner, VStack } from "@chakra-ui/react"
import Head from "next/head"

import { useMe } from "lib/hooks/useMe"
import { HomeLayout } from "components/HomeLayout"

const _ = gql`
  mutation DestroyAccount {
    destroyAccount
  }
`

export default function Home() {
  const { me, loading } = useMe()

  return (
    <Box>
      <Head>
        <title>Boilerplate</title>
      </Head>

      <Center minH="80vh" p={4} pt={{ base: 40, md: 4 }} pos="relative">
        <VStack spacing={6}>
          <Heading as="h1" textAlign="center">
            Welcome to the Boilerplate
          </Heading>
          {loading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            me && (
              <Heading as="h3" fontSize="2xl">
                Hello, {me.firstName}!
              </Heading>
            )
          )}
        </VStack>
      </Center>
    </Box>
  )
}

Home.getLayout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
