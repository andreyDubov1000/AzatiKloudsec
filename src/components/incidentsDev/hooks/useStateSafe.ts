import React, { useCallback, useEffect, useRef, useState } from 'react'

export const useStateSafe = <T>(initialValue: T | (() => T)) => {
  const [state, setState] = useState<T>(initialValue)
  const mountedRef = useRef<boolean>()

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const setValue: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (value) => {
      if (mountedRef.current) {
        setState(value)
      }
    },
    [setState]
  )
  return [state, setValue] as const
}
