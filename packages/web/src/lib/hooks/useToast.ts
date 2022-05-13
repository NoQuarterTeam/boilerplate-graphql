import type { UseToastOptions } from "@chakra-ui/react"
import { useToast as useChakraToast } from "@chakra-ui/react"

export function useToast() {
  const toast = useChakraToast()
  const handleToast = (props: UseToastOptions) => {
    toast({
      position: "bottom-right",
      isClosable: true,
      status: "success",
      ...props,
    })
  }
  return handleToast
}
