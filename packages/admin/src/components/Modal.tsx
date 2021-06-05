import * as React from "react"

import {
  Modal as CModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalProps,
  ModalCloseButton,
} from "@chakra-ui/react"

interface Props extends ModalProps {
  title?: string
}
export const Modal: React.FC<Props> = (props) => {
  return (
    <CModal {...props}>
      <ModalOverlay />
      <ModalContent borderRadius="md">
        <ModalCloseButton />
        {props.title && <ModalHeader pb={3}>{props.title}</ModalHeader>}
        <ModalBody mb={4}>{props.children}</ModalBody>
      </ModalContent>
    </CModal>
  )
}
