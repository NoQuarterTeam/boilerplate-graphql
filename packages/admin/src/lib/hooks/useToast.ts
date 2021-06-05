import { useToast as useChakraToast, UseToastOptions } from "@chakra-ui/react"

export function useToast() {
  const toast = useChakraToast()
  const handleToast = (props: UseToastOptions) => {
    toast({
      position: "bottom-right",
      isClosable: true,
      ...props,
    })
  }
  return handleToast
}
