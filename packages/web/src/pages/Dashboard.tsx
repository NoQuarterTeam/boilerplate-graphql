import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Heading, Button, useColorMode, Box } from "@chakra-ui/core"
import { useLocalStorage } from "@noquarter/hooks"

import { Page } from "../components/Page"
import { useMe } from "../components/providers/MeProvider"
import { useLogout } from "../lib/hooks/useLogout"

export const Dashboard: FC<RouteComponentProps> = () => {
  const me = useMe()
  const [, setColorMode] = useLocalStorage<"dark" | "light">(
    "fullstack:darkmode",
    "dark",
  )
  const { colorMode, toggleColorMode } = useColorMode()
  const toggleColor = () => {
    setColorMode(colorMode === "light" ? "dark" : "light")
    toggleColorMode()
  }
  const logout = useLogout()
  return (
    <Page>
      <Box>
        <Heading mb={4}>
          Hello there, {me.firstName} {me.lastName}
        </Heading>
        <Button onClick={logout}>Logout</Button>
      </Box>

      <Button
        variant="outline"
        onClick={toggleColor}
        pos="absolute"
        bottom={4}
        left={4}
      >
        Toggle Color Mode
      </Button>
    </Page>
  )
}
