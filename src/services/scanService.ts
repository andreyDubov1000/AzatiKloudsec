import { useCallback } from 'react'
import KloudApi from './kloudApi'
import { useCancelToken } from './utils'

export const useScanAccount = () => {
  const [sourceRef, getCancelToken] = useCancelToken()

  const scanAccount = useCallback(
    (userId: string, cloud_id: string, accountId: string, scan_type: string[]) => {
      return KloudApi.post(
        `/users/${userId}/providers/${cloud_id}/accounts/${accountId}/scan-requests`,
        { scan_type },
        { cancelToken: getCancelToken() }
      )
    },
    [getCancelToken]
  )
  return [sourceRef, scanAccount] as const
}

export const useCheckScanReqest = () => {
  const [sourceRef, getCancelToken] = useCancelToken()

  const checkScanReqest = useCallback(
    (user_id: string, cloud_id: string, account_id: string, request_id: string) => {
      return KloudApi.get(`/users/${user_id}/providers/${cloud_id}/accounts/${account_id}/scan-requests/${request_id}`, {
        cancelToken: getCancelToken(),
      })
    },
    [getCancelToken]
  )
  return [sourceRef, checkScanReqest] as const
}

export const scanAwsAccount = async (userId: string, cloud_id: string, accountId: string, scan_type: string[]) => {
  return KloudApi.post(`/users/${userId}/providers/${cloud_id}/accounts/${accountId}/scan-requests`, {
    scan_type,
  })
}

export const checkAwsScanReqest = async (userId: string, cloud_id: string, accountId: string, requestId: string) => {
  return KloudApi.get(`/users/${userId}/providers/${cloud_id}/accounts/${accountId}/scan-requests/${requestId}`)
}
