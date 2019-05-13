import { useEffect } from "react"

function useEventListener(
  key: string,
  cb: (e: any) => void,
  options?: any,
  deps?: any,
) {
  useEffect(() => {
    window.addEventListener(key, cb, options)
    return () => window.removeEventListener(key, cb, options)
  }, [cb, key, options])
}

export default useEventListener
