export const formatUpdateData = (data: any) =>
  Object.entries(data).reduce((data, [field, value]) => {
    data[field] = { set: value }
    return data
  }, {} as any)

export const pruneApolloData = (data: any, fields?: string[]) => {
  const copy = { ...data }
  if (copy.__typename) delete copy.__typename
  if (copy.id) delete copy.id
  fields?.forEach((field) => {
    if (copy[field]) delete copy[field]
  })
  return copy
}
