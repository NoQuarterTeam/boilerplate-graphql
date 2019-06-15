import React, { FC } from "react"

import { StateProvider as StateContextProvider } from "../../lib/context"

import { useMe } from "../../lib/graphql/user/hooks"
import Loading from "../Loading"

const StateProvider: FC = ({ children }) => {
  const { user, userLoading } = useMe()
  return (
    <StateContextProvider value={{ user }}>
      <Loading loading={userLoading}>{children}</Loading>
    </StateContextProvider>
  )
}

export default StateProvider
