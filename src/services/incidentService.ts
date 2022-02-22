import axios, { CancelTokenSource } from 'axios'
import { useCallback, useRef } from 'react'
import KloudApi from './kloudApi'

const useCancelToken = () => {
  const sourceRef = useRef<CancelTokenSource | null>(null)

  const newCancelToken = useCallback(() => {
    sourceRef.current = axios.CancelToken.source()
    return sourceRef.current.token
  }, [sourceRef])
  return [sourceRef, newCancelToken] as const
}

export const useGetOverallUserAccountStatus = () => {
  const [sourceRef, newCancelToken] = useCancelToken()

  const getStatus = useCallback(
    (user_id: string) => {
      return KloudApi.get(`/users/${user_id}/providers/aws/status`, { cancelToken: newCancelToken() })
    },
    [newCancelToken]
  )
  return [sourceRef, getStatus] as const
}

export const getOverallUserAccountStatus = async (user_id: string) => {
  return KloudApi.get(`/users/${user_id}/providers/aws/status`)
}
export const getUserAccountStatus = async (user_id: string, account_id: string) => {
  return KloudApi.get(`/users/${user_id}/providers/aws/accounts/${account_id}/status`)
}

export const getUserAccountTest = async (user_id: string) => {
  return KloudApi.get(`/users/${user_id}/providers/aws/accounts/`)
}
