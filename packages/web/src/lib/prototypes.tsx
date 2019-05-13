Array.prototype.groupBy = function(this: any, key: string) {
  const obj = this.reduce((acc: any, item: any) => {
    const itemKey = item[key]
    if (!acc[itemKey]) {
      acc[itemKey] = []
    }
    acc[itemKey].push(item)
    return acc
  }, {})
  return Object.keys(obj).map(itemKey => ({
    key: itemKey,
    values: obj[itemKey],
  }))
}

Array.prototype.sumBy = function(this: any, key: string) {
  return this.reduce((acc: any, item: any) => {
    return acc + item[key]
  }, 0)
}
