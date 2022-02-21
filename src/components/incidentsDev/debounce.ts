import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debValue, setValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debValue
}
