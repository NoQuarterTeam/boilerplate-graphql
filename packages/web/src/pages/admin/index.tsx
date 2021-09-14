import * as React from "react"
import { Center, Heading } from "@chakra-ui/react"
import { withAdmin } from "components/hoc/withAdmin"

function AdminHome() {
  return (
    <Center pt={20}>
      <Heading>Welcome to the admin dashboard</Heading>
    </Center>
  )
}

export default withAdmin(AdminHome)
