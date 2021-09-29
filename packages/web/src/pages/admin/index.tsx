import * as React from "react"
import { Center, Heading } from "@chakra-ui/react"

import { AdminLayout } from "components/AdminLayout"

export default function AdminHome() {
  return (
    <Center pt={20}>
      <Heading>Welcome to the admin dashboard</Heading>
    </Center>
  )
}

AdminHome.getLayout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>
