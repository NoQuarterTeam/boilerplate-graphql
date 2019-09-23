import { useState, useEffect, useLayoutEffect } from "react"
import { DependencyList, EffectCallback } from "react"

export type Effect = (effect: EffectCallback, deps?: DependencyList) => void
export type MediaQueryObject = { [key: string]: string | number | boolean }

const QUERY_COMBINATOR = " and "
const noop = () => {}

export const mockMediaQueryList: MediaQueryList = {
  media: "",
  matches: false,
  onchange: noop,
  addListener: noop,
  removeListener: noop,
  addEventListener: noop,
  removeEventListener: noop,
  // eslint-disable-next-line
  dispatchEvent: (_: Event) => true,
}
function camelToHyphen(camelString: string) {
  return camelString
    .replace(/[A-Z]/g, string => `-${string.toLowerCase()}`)
    .toLowerCase()
}

function queryObjectToString(query: string | MediaQueryObject) {
  if (typeof query === "string") {
    return query
  }

  return Object.entries(query)
    .map(([feature, value]) => {
      const convertedFeature = camelToHyphen(feature)
      let convertedValue = value

      if (typeof convertedValue === "boolean") {
        return convertedValue ? convertedFeature : `not ${convertedFeature}`
      }

      if (
        typeof convertedValue === "number" &&
        /[height|width]$/.test(convertedFeature)
      ) {
        convertedValue = `${convertedValue}px`
      }

      return `(${convertedFeature}: ${convertedValue})`
    })
    .join(QUERY_COMBINATOR)
}
const createUseMedia = (effect: Effect) => (
  rawQuery: string | MediaQueryObject,
  defaultState = false,
) => {
  const [state, setState] = useState(defaultState)
  const query = queryObjectToString(rawQuery)

  effect(() => {
    let mounted = true
    const mediaQueryList: MediaQueryList =
      typeof window === "undefined"
        ? mockMediaQueryList
        : window.matchMedia(query)

    const onChange = () => {
      if (!mounted) {
        return
      }

      setState(Boolean(mediaQueryList.matches))
    }

    mediaQueryList.addListener(onChange)
    setState(mediaQueryList.matches)

    return () => {
      mounted = false
      mediaQueryList.removeListener(onChange)
    }
  }, [query])

  return state
}

export const useMedia = createUseMedia(useEffect)
export const useMediaLayout = createUseMedia(useLayoutEffect)

export default useMedia
