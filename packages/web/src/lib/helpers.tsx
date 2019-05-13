export const snakeToCamel = (value: string) =>
  value.replace(/_(\w)/g, m => m[1].toUpperCase())

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const round = (value: number, places = 2) => {
  const exp = Math.pow(10, places)
  return Math.round(value * exp) / exp
}

export const sleep = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), delay)
  })
}

export const decimalCount = (value: number) => {
  if (value % 1 !== 0) return value.toString().split(".")[1].length
  return 0
}
