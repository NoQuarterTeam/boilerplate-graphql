import * as React from "react"
import type {
  ModalProps} from "@chakra-ui/react";
import {
  Modal as CModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react"

interface Props extends ModalProps {
  title?: string
}
export function Modal(props: Props) {
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
