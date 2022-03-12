import { debounce } from 'lodash'
import { useCallback, useState } from 'react'
import KloudApi from './kloudApi'
import { useCancelToken } from './utils'

type SecurityException = {
  resource_vulnerability_id: string
  cloud_service: string
  security_exception_comment: string
  security_exception_author: string
}

export function useSearchQuery(initialSearchValue: string = '') {
  const [sourceRef, getCancelToken] = useCancelToken()
  const [enteredSearchValue, setEnteredSearchValue] = useState(initialSearchValue)

  const getSearch = useCallback(
    (user_id: string, value: string) => {
      if (sourceRef.current) sourceRef.current.cancel('Search query cancel')
      if (value) {
        return KloudApi.get(`/users/${user_id}/providers/aws/security-exceptions`, {
          cancelToken: getCancelToken(),
        })
      }
      return KloudApi.get(`/users/${user_id}/providers/aws/security-exceptions`, {
        cancelToken: getCancelToken(),
      })
    },
    [getCancelToken]
  )

  return [sourceRef, enteredSearchValue, setEnteredSearchValue, getSearch] as const
}

export const useCreateSecurityException = () => {
  const [sourceRef, getCancelToken] = useCancelToken()

  const postException = useCallback(
    (user_id: string, account_id: string, data: SecurityException) => {
      return KloudApi.post(`/users/${user_id}/providers/aws/accounts/${account_id}/security-exceptions`, data, {
        cancelToken: getCancelToken(),
      })
    },
    [getCancelToken]
  )
  return [sourceRef, postException] as const
}

export const useGetAllSecurityExceptions = () => {
  const [sourceRef, getCancelToken] = useCancelToken()

  const getAllExceptions = useCallback(
    (user_id: string) => {
      return KloudApi.get(`/users/${user_id}/providers/aws/security-exceptions`, {
        cancelToken: getCancelToken(),
      })
    },
    [getCancelToken]
  )
  return [sourceRef, getAllExceptions] as const
}

export const useDeleteSecurityException = () => {
  const [sourceRef, getCancelToken] = useCancelToken()

  const deleteException = useCallback(
    (user_id: string, account_id: string, resource_vulnerability_id: string) => {
      return KloudApi.delete(`/users/${user_id}/providers/aws/accounts/${account_id}/security-exceptions/${resource_vulnerability_id}`, {
        cancelToken: getCancelToken(),
      })
    },
    [getCancelToken]
  )
  return [sourceRef, deleteException] as const
}

export const createSecurityException = async (user_id: string, account_id: string, data: SecurityException) => {
  return KloudApi.post(`/users/${user_id}/providers/aws/accounts/${account_id}/security-exceptions`, data)
}

export const getAllSecurityExceptions = async (user_id: string) => {
  return KloudApi.get(`/users/${user_id}/providers/aws/security-exceptions`)
}

export const getAWSSecurityExcepions = async (user_id: string, account_id: string) => {
  return KloudApi.get(`/users/${user_id}/providers/aws/accounts/${account_id}/security-exceptions`)
}

export const deleteSecurityException = async (user_id: string, account_id: string, resource_vulnerability_id: string) => {
  return KloudApi.delete(`/users/${user_id}/providers/aws/accounts/${account_id}/security-exceptions/${resource_vulnerability_id}`)
}
