import React from "react"

interface Props {
  default?: boolean
}
export function useToggle(props?: Props): [boolean, () => void] {
  const [isOpen, setIsOpen] = React.useState<boolean>(props?.default || false)
  const toggle = () => setIsOpen(!isOpen)
  return [isOpen, toggle]
}
