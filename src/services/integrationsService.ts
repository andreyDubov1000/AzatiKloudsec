import { useCallback } from 'react'
import KloudApi from './kloudApi'
import { useCancelToken } from './utils'

export const getAWSAccounts = async (user_id: string) => {
  return KloudApi.get(`/users/${user_id}/providers/aws/accounts`)
}

export const useGetAccounts = () => {
  const [sourceRef, getCancelToken] = useCancelToken()

  const getAccounts = useCallback(
    (user_id: string, cloud_id: string) => {
      return KloudApi.get(`/users/${user_id}/providers/${cloud_id}/accounts`, {
        cancelToken: getCancelToken(),
      })
    },
    [getCancelToken]
  )
  return [sourceRef, getAccounts] as const
}
