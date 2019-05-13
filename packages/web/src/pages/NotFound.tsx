import React, { FC } from "react"
import { RouteComponentProps, Redirect } from "@reach/router"

const NotFound: FC<RouteComponentProps> = () => {
  return <Redirect to="/" noThrow={true} />
}

export default NotFound
