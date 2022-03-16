import { useState, useEffect } from 'react'

export function useLocalStorage<T>(initialValue: T, key?: string, save?: (i: T) => boolean) {
  const getValue = (): T => {
    if (!key) return initialValue
    const storage = localStorage.getItem(key)
    return storage && storage !== 'undefined' ? JSON.parse(storage) : initialValue
  }

  const [value, setValue] = useState(getValue)

  useEffect(() => {
    if (key) {
      const isSave = typeof save === 'function' ? save(value) : true
      if (isSave) {
        localStorage.setItem(key, JSON.stringify(value))
      } else {
        localStorage.removeItem(key)
      }
    }
  }, [value, key])

  return [value, setValue] as const
}
