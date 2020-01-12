import React, { FC } from "react"
import { RouteComponentProps, Redirect } from "@reach/router"

export const NotFound: FC<RouteComponentProps> = () => {
  return <Redirect to="/" noThrow={true} />
}
