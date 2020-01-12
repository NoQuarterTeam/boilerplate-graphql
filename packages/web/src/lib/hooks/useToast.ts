import { useToast as useChakraToast, useToastOptions } from "@chakra-ui/core"

export function useToast() {
  const toast = useChakraToast()
  const handleToast = (props: useToastOptions) => {
    toast({
      position: "bottom-right",
      isClosable: true,
      ...props,
    })
  }
  return handleToast
}
