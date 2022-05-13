import { IToastProps, useToast as useNToast } from "native-base"
import { Dimensions } from "react-native"
const width = Dimensions.get("window").width

export function useToast() {
  const toast = useNToast()
  return {
    ...toast,
    show: (props: IToastProps) => toast.show({ width: width - 20, placement: "top", ...props }),
  }
}
