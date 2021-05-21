interface Data<T> {
  items: T[]
  count: number
}

type Model<T> = {
  [key: string]: Data<T>
}

export interface FetchResult<T> {
  fetchMoreResult: Model<T>
}

export function paginate<T>(key: string) {
  return (prev: Model<T>, { fetchMoreResult }: FetchResult<T>) => {
    if (!fetchMoreResult || !prev[key].items || !fetchMoreResult[key].items) return prev
    return Object.assign({}, prev, {
      [key]: {
        ...prev[key],
        count: fetchMoreResult[key].count,
        items: [...prev[key].items, ...fetchMoreResult[key].items],
      },
    })
  }
}
