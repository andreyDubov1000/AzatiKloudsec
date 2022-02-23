import { useCallback } from 'react'
import KloudApi from './kloudApi'
import { useCancelToken } from './utils'

export const useGetOverallUserAccountStatus = () => {
  const [sourceRef, getCancelToken] = useCancelToken()

  const getStatus = useCallback(
    (user_id: string) => {
      return KloudApi.get(`/users/${user_id}/providers/aws/status`, {
        cancelToken: getCancelToken(),
      })
    },
    [getCancelToken]
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
