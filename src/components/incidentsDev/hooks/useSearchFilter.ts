import { useMemo, useState } from 'react'
import { useDebounce } from './useDebounce'

type SearchItem<T extends string | number | symbol> = Record<T, any>

export function useSearchFilter<P extends Partial<SearchItem<keyof P>>>(
  items: P[],
  filteredProps: (keyof P)[],
  initialSearchValue: string = ''
) {
  const [enteredSearchValue, setEnteredSearchValue] = useState<string>(initialSearchValue)
  const activeSearchValue = useDebounce(enteredSearchValue, 300)

  let availableItems = useMemo(() => {
    if (!activeSearchValue) return items
    const regExp = RegExp(activeSearchValue, 'i')
    return items.filter((item) => {
      return filteredProps.reduce((isMatch, prop) => {
        if (item[prop] && typeof item[prop] === 'string') {
          return isMatch || regExp.test(item[prop])
        }
        return isMatch
      }, false as boolean)
    })
  }, [activeSearchValue, items, filteredProps])

  return [availableItems, enteredSearchValue, setEnteredSearchValue] as const
}
