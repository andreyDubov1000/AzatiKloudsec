import Loader from '@component/atoms/Loader'
import PageTitle from '@component/atoms/PageTitle'
import { useAppSelector } from '@redux/hooks'
import React, { useEffect, useState } from 'react'
import { useGetAccounts } from 'services/integrationsService'
import { SecondMenu } from '@component/elements'
import styles from './Scans.module.scss'
import { useParams } from 'react-router-dom'
import ScanListAcc from './ScanListAcc'

export interface IAccounts {
  AccountId: string
  AccountAlias: string
}

interface ScansPropsType {}

const Scans: React.FC<ScansPropsType> = ({}) => {
  const [loading, setLoading] = useState(true)
  const [accountList, setAccountList] = useState<IAccounts[]>([])
  const { cloud_id } = useParams<any>()
  const [sourceRefAccounts, getAccounts] = useGetAccounts()
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    const getAccountList = async (user_id: string | undefined, cloud_id: string | undefined) => {
      if (cloud_id && user_id) {
        const list = (await getAccounts(user_id, cloud_id)) || []
        setAccountList(list.AwsAccounts)
      }
      setLoading(false)
    }

    getAccountList(user?.user_id, cloud_id)
    return () => {
      if (sourceRefAccounts.current) sourceRefAccounts.current.cancel('Scan cancel getting Accounts list')
    }
  }, [user, cloud_id])

  const cloudList = [
    {
      title: 'All accounts',
      url: '/scans',
    },
    {
      title: 'AWS',
      url: '/scans/aws',
    },
    {
      title: 'Azure',
      url: '/security-exceptions/aws',
    },
    {
      title: 'IBM cloud',
      url: '/security-exceptions/aws',
    },
    {
      title: 'Google cloud',
      url: '/security-exceptions/aws',
    },
    {
      title: 'Alibaba cloud',
      url: '/security-exceptions/aws',
    },
  ]

  return (
    <>
      {loading && <Loader />}
      <PageTitle title={'Scan accounts'} />
      <h1>{`Scan: ${cloud_id?.toUpperCase() || 'ALL'} accounts`}</h1>
      <div className={styles.scan_layout}>
        <div className={styles.cloud_menu}>
          <SecondMenu items={cloudList} />
        </div>
        <div className={styles.accaunts_tab}>
          <ScanListAcc accountList={accountList} user_id={user?.user_id} cloud_id={cloud_id} />
        </div>
      </div>
    </>
  )
}

export default Scans
