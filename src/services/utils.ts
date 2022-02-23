import axios, { CancelTokenSource } from 'axios'
import { useCallback, useRef } from 'react'

export const useCancelToken = () => {
  const sourceRef = useRef<CancelTokenSource | null>(null)

  const getCancelToken = useCallback(() => {
    sourceRef.current = axios.CancelToken.source()
    return sourceRef.current.token
  }, [sourceRef])
  return [sourceRef, getCancelToken] as const
}
