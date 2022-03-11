import KloudApi from './kloudApi'

export const scanAwsAccount = async (userId: string, cloud_id: string, accountId: string, scan_type: string[]) => {
  return KloudApi.post(`/users/${userId}/providers/${cloud_id}/accounts/${accountId}/scan-requests`, {
    scan_type,
  })
}

export const checkAwsScanReqest = async (userId: string, cloud_id: string, accountId: string, requestId: string) => {
  return KloudApi.get(`/users/${userId}/providers/${cloud_id}/accounts/${accountId}/scan-requests/${requestId}`)
}
