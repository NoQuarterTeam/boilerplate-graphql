import dayjs from "dayjs"

export const humanize = (str: string) => {
  return str
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase()
    })
}

export const formatFileName = (filename: string): string => {
  const type = filename.split(".").pop()
  let name = filename
    .split(".")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
  name = dayjs().format("YYYYMMDDHHmmss") + "-" + name
  if (type) {
    name = name + "." + type.toLowerCase()
  }
  return name
}

export function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.substring(1)
}

export function camelToHuman(name?: string | null): string {
  if (!name) return ""
  const words = name.match(/[A-Za-z][a-z]*/g) || []
  return words.map(capitalize).join(" ")
}

export function formatMultiSelectValue(options?: string | null): string {
  if (!options) return ""
  const parsedOptions = JSON.parse(options) as {
    value: string
    label: string
  }[]
  let formatted = ""
  parsedOptions.forEach((option, index) => {
    formatted += option.label
    if (index !== parsedOptions.length - 1) {
      formatted += ", "
    }
  })
  return formatted
}
