import dayjs from "dayjs"

function toCamel(text: string) {
  return text.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    // eslint-disable-next-line
    (_: any, p1: string, p2: string, __: any) => {
      if (p2) return p2.toUpperCase()
      return p1.toLowerCase()
    },
  )
}

export const keysToCamel = (o: { [key: string]: any }) => {
  const n = {} as any
  Object.entries(o).forEach(([k, v]) => {
    if (v?.constructor === Object) {
      n[toCamel(k)] = keysToCamel(v)
    } else {
      n[toCamel(k)] = v
    }
  })
  return n
}

export const timeUntilEndOfDay = () => {
  const date1 = dayjs().endOf("day")
  const date2 = dayjs()
  return date1.diff(date2)
}
