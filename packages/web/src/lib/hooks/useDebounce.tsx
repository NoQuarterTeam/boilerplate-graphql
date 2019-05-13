import { useState, useCallback, useEffect, useRef } from "react"

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce

export function useDebouncedCallback(
  callback: (...args: any) => void,
  delay: any,
  deps: any,
) {
  const functionTimeoutHandler = useRef<any>(null)
  const debouncedFunction = useCallback(callback, deps)

  useEffect(
    () => () => {
      clearTimeout(functionTimeoutHandler.current)
    },
    [],
  )

  return (...args: any) => {
    clearTimeout(functionTimeoutHandler.current)
    functionTimeoutHandler.current = setTimeout(() => {
      debouncedFunction(...args)
    }, delay)
  }
}
