interface Array {
  groupBy<T>(key: string): { key: string; values: T[] }[]
}

interface Array {
  sumBy<number>(key: string): number
}
