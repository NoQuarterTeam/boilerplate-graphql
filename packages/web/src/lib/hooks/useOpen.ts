import React from "react"

export function useOpen(): [boolean, () => void, () => void] {
  const [isOpen, setIsOpen] = React.useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  return [isOpen, open, close]
}
