import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

type ISearchItem<T extends string | number | symbol> = Record<T, any>

export function useSort<P extends Partial<ISearchItem<keyof P>>>(list: P[], filterProp: keyof P) {
  const [savedSelectedSortOrder, setSavedSelectedSortOrder] = useLocalStorage<'asc' | 'desc'>('desc', 'selectedDateOrder')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(savedSelectedSortOrder)

  const sortedList = list.slice().sort((a: P, b: P) => {
    let itemA: P[keyof P] | Date = a[filterProp]
    let itemB: P[keyof P] | Date = b[filterProp]

    if (filterProp === 'VulnerabilityDate') {
      itemA = new Date(a[filterProp])
      itemB = new Date(b[filterProp])
    }
    if (itemA < itemB) {
      return sortOrder === 'asc' ? 1 : -1
    } else if (itemA > itemB) {
      return sortOrder === 'asc' ? -1 : 1
    }
    return 0
  })

  const setOrder = (order: 'asc' | 'desc') => {
    setSortOrder(order)
    setSavedSelectedSortOrder(order)
  }

  return [sortedList, sortOrder, setOrder] as const
}
