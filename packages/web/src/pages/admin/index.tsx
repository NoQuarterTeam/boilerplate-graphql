import * as React from "react"
import { Center, Heading } from "@chakra-ui/react"
import { AdminLayout } from "components/AdminLayout"
import { withAuth } from "components/hoc/withAuth"
import { Role } from "lib/graphql"

function AdminHome() {
  return (
    <AdminLayout>
      <Center pt={20}>
        <Heading>Welcome to the admin dashboard</Heading>
      </Center>
    </AdminLayout>
  )
}

export default withAuth(AdminHome, (user) => user.role === Role.Admin)
