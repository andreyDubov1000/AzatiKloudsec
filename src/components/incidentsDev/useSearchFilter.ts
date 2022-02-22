import { useState } from 'react'
import { useDebounce } from './debounce'

type ISearchItem<T extends string | number | symbol> = Record<T, any>

export function useSearchFilter<P extends Partial<ISearchItem<keyof P>>>(
  items: P[],
  filterProps: (keyof P)[],
  initialSearchValue: string = ''
) {
  const [enteredSearchValue, setEnteredSearchValue] = useState<string>(initialSearchValue)
  const activeSearchValue = useDebounce(enteredSearchValue, 300)
  let availableItems = items

  if (!!activeSearchValue) {
    const regExp = RegExp(activeSearchValue, 'i')

    availableItems = items.filter((item) => {
      return filterProps.reduce((isMatch, prop) => {
        if (item[prop] && typeof item[prop] === 'string') {
          return isMatch || regExp.test(item[prop])
        }
        return false
      }, false as boolean)
    })
  }

  return [availableItems, enteredSearchValue, setEnteredSearchValue] as const
}
