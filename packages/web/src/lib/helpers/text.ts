export const humanize = (str: string) => {
  return str
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase()
    })
}

export function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.substring(1)
}

export function camelToHuman(name?: string | null): string {
  if (!name) return ""
  const words = name.match(/[A-Za-z][a-z]*/g) || []
  return words.map(capitalize).join(" ")
}
