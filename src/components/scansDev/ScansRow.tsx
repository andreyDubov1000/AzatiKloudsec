import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useCheckScanReqest, useScanAccount } from 'services/scanService'
import { ActionButton, SelectService } from '@component/elements'
import styles from './ScansRow.module.scss'
import { useLocalStorage } from '@component/incidentsDev/hooks/useLocalStorage'

export interface ScansRowProps {
  user_Id: string | undefined
  AccountId: string
  AccountAlias: string
  cloud_id: string | undefined
}

const ScansRow: React.FC<ScansRowProps> = ({ user_Id, cloud_id, AccountId, AccountAlias }) => {
  const [loading, setLoading] = useState(false)
  const [scanAccountRef, scanAccount] = useScanAccount()
  const [checkReqestRef, checkScanReqest] = useCheckScanReqest()
  const [checkedList, setCheckedList] = useLocalStorage<{ label: string; value: string }[]>([], AccountId, (item) => !!item.length)
  const intervalRef = useRef<any>(null)

  const handleScan = async () => {
    if (loading) {
      setLoading(false)
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (scanAccountRef.current) scanAccountRef.current.cancel('ScansRow cancel scaning')
      if (checkReqestRef.current) checkReqestRef.current.cancel('ScansRow cancel checking')
      return
    }
    if (!!checkedList.length && user_Id && AccountId && cloud_id) {
      setLoading(true)
      const valueList = checkedList.map((item) => item.value)
      const checkRequest = await scanAccount(user_Id, cloud_id, AccountId, valueList)
      const requestId = checkRequest?.RequestId

      if (requestId) {
        const newWindow = window.open(`${window.location.origin}/scans/${cloud_id}/${AccountId}/${requestId}`)
        intervalRef.current = setInterval(async () => {
          const data = await checkScanReqest(user_Id, cloud_id, AccountId, requestId)
          if (!data) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            setLoading(false)
            if (newWindow) newWindow.close()
            return
          }
          if (data?.Vulnerabilities) {
            setLoading(false)
            if (newWindow) {
              setTimeout(() => {
                newWindow.postMessage([AccountId, data.Vulnerabilities], window.location.origin)
              }, 1000)
            }
            if (intervalRef.current) clearInterval(intervalRef.current)
          }
        }, 5000)
      }
    }
  }
  useEffect(
    () => () => {
      if (scanAccountRef.current) scanAccountRef.current.cancel('ScansRow cancel scaning')
      if (checkReqestRef.current) checkReqestRef.current.cancel('ScansRow cancel checking')
      if (intervalRef.current) clearInterval(intervalRef.current)
    },
    []
  )

  return (
    <div className={styles.row}>
      <div className={styles.title}>
        <p>{AccountAlias}</p>
        <p>{AccountId}</p>
      </div>
      <SelectService disabled={loading} className={styles.select} checkedList={checkedList} setCheckedList={setCheckedList} />
      <ActionButton className={styles.button} type='filled' onClick={handleScan} disabled={!checkedList.length} active={loading}>
        {loading ? 'Stop scaning' : 'Scan'}
      </ActionButton>
    </div>
  )
}

export default ScansRow
