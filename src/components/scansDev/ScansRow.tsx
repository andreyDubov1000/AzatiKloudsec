import CustomBox from '@component/atoms/CustomBox'
import CustomImage from '@component/atoms/CustomImage'
import CustomTableRow from '@component/atoms/CustomTableRow'
import { Span } from '@component/atoms/Typography'
import { Autocomplete, Checkbox, TextField } from '@material-ui/core'
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons'
import { LoadingButton } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { scanAwsAccount } from 'services/scanService'
import { ActionButton, SelectService } from '@component/elements'
import styles from './ScansRow.module.scss'
import { useLocalStorage } from '@component/incidentsDev/hooks/useLocalStorage'
import { checkAwsScanReqest } from 'services/scanService'

export interface ScansRowProps {
  user_Id: string | undefined
  AccountId: string
  AccountAlias: string
  cloud_id: string | undefined
}

const ScansRow: React.FC<ScansRowProps> = ({ user_Id, cloud_id, AccountId, AccountAlias }) => {
  const [loading, setLoading] = useState(false)
  const [requestId, setRequestId] = useState('')
  const [checkedList, setCheckedList] = useLocalStorage<{ label: string; value: string }[]>([], AccountId, (item) => !!item.length)

  const handleScan = async () => {
    if (!!checkedList.length && user_Id && AccountId && cloud_id) {
      setLoading(true)
      const valueList = checkedList.map((item) => item.value)
      const checkRequest = await scanAwsAccount(user_Id, cloud_id, AccountId, valueList)
      if (checkRequest) setRequestId(checkRequest.RequestId)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (requestId && AccountId && cloud_id) {
      console.log('открыто окно', AccountId, requestId, cloud_id)
      const newWindow = window.open(`${window.location.origin}/scans/${cloud_id}/${AccountId}/${requestId}`)
      if (newWindow) {
        console.log('добавлен слушатель')
        newWindow.addEventListener(
          'message',
          (event) => {
            if (event.origin !== window.location.origin) return
            console.log('получено', event.data)
          },
          false
        )
      }
    }
  }, [AccountId, requestId, cloud_id])

  // useEffect(() => {
  //   let interval: any = null
  //   if (user_Id && AccountId && requestId && cloud_id) {
  //     setLoading(true)
  //     interval = setInterval(async () => {
  //       const data = await checkAwsScanReqest(user_Id, cloud_id, AccountId, requestId)
  //       console.log(data)
  //       if (!data) {
  //         clearInterval(interval)
  //         setLoading(false)
  //         return
  //       }
  //       if (data?.Vulnerabilities) {
  //         setLoading(false)
  //         const newWindow = window.open(`${window.location.origin}/scans/${cloud_id}/${AccountId}/${requestId}`)
  //         if (newWindow) {
  //           newWindow.onload = () => {
  //             console.log('отправка сообщения', window.location.origin)
  //             newWindow.postMessage('жопа жопа жопа', window.location.origin)
  //           }
  //         }
  //         if (interval) clearInterval(interval)
  //       }
  //     }, 5000)
  //   }
  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [AccountId, requestId, user_Id, cloud_id, checkAwsScanReqest])

  return (
    <div className={styles.row}>
      <div className={styles.title}>
        <p>{AccountAlias}</p>
        <p>{AccountId}</p>
      </div>

      <SelectService className={styles.select} checkedList={checkedList} setCheckedList={setCheckedList} />
      <ActionButton className={styles.button} type='filled' onClick={handleScan} disabled={loading}>
        {loading ? 'In progress' : 'Scan'}
      </ActionButton>
    </div>
  )
}

export default ScansRow
