import { useState, useEffect } from 'react'

export const classNames = (...names: string[]) => names.join(' ')

export function useLocalStorage<T>(initialValue: T, key: string) {
  const getValue = (): T => {
    const storage = localStorage.getItem(key)

    if (storage && storage !== 'undefined') {
      return JSON.parse(storage)
    }
    return initialValue
  }
  const [value, setValue] = useState(getValue)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue] as const
}
