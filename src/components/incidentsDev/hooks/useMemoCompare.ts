import { useEffect, useRef } from 'react'

function useMemoCompare<T>(next: T, compare: (prev: T | null, next: T) => boolean) {
  const previousRef = useRef<T | null>()
  const previous = previousRef.current || null
  const isEqual = compare(previous, next)

  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next
    }
  })

  return isEqual ? previous : next
}

export default useMemoCompare
