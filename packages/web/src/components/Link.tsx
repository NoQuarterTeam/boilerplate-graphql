import React from "react"
import { Link as CLink, LinkProps } from "@chakra-ui/core"
import { Link as RLink, LinkProps as RLinkProps } from "@reach/router"

export const Link: React.FC<LinkProps & RLinkProps<{}>> = props => {
  return (
    // TODO: remove when chakra fix types
    // eslint-disable-next-line
    // @ts-ignore
    <CLink as={RLink} {...props}>
      {props.children}
    </CLink>
  )
}
