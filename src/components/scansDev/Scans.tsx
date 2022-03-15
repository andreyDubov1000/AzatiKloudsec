import Loader from '@component/atoms/Loader'
import PageTitle from '@component/atoms/PageTitle'
import { useAppSelector } from '@redux/hooks'
import React, { useEffect, useState } from 'react'
import { useGetAccounts } from 'services/integrationsService'
import { SecondMenu } from '@component/elements'
import styles from './Scans.module.scss'
import { useLocation, useParams } from 'react-router-dom'
import ScanListAcc from './ScanListAcc'
import { useStateSafe } from '@component/incidentsDev/hooks/useStateSafe'
import AddAccount from '@component/integrationDev/AddAccount'
import IntegrationListAcc from '@component/integrationDev/IntegrationListAcc'
import ScrollBar from 'react-perfect-scrollbar'

export interface IAccount {
  AccountId: string
  AccountAlias: string
  CfStackId: string
  CfTemplateVersion: string
  KloudsecRoleCfTemplateUpToDate: boolean
  Reachability: string
}

interface ScansPropsType {}

const Scans: React.FC<ScansPropsType> = ({}) => {
  const { pathname } = useLocation()
  const matchPath = pathname.match('scans') || pathname.match('integrations')!
  const currentPage = matchPath[0] as 'scans' | 'integrations'
  const isScanPage = currentPage === 'scans'
  const isIntegrations = currentPage === 'integrations'
  const [loading, setLoading] = useStateSafe(true)
  const [accountList, setAccountList] = useState<IAccount[]>([])
  const { cloud_id } = useParams<any>()
  const [sourceRefAccounts, getAccounts] = useGetAccounts()
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    const getAccountList = async (user_id: string | undefined, cloud_id: string | undefined) => {
      if (cloud_id && user_id) {
        const list = (await getAccounts(user_id, cloud_id)) || []
        const dataList = list.AwsAccounts.map((item: any) => ({
          id: item.AccountId,
          user_id,
          ...item,
        }))
        console.log(dataList)
        setAccountList(dataList)
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
      url: `/${currentPage}`,
    },
    {
      title: 'AWS',
      url: `/${currentPage}/aws`,
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
      <PageTitle title={`${currentPage} accounts`} />
      <h1 className={styles.title}>{`${currentPage}: ${cloud_id?.toUpperCase() || 'ALL'} accounts`}</h1>
      <div className={styles.scan_layout}>
        <ScrollBar className={styles.cloud_menu}>
          <SecondMenu items={cloudList}>{isIntegrations ? <AddAccount user_id={user?.user_id} /> : null}</SecondMenu>
        </ScrollBar>
        <div className={styles.accaunts_tab}>
          {isScanPage ? <ScanListAcc accountList={accountList} user_id={user?.user_id} cloud_id={cloud_id} /> : null}
          {isIntegrations ? (
            <IntegrationListAcc accountList={accountList} loading={loading} user_id={user?.user_id} cloud_id={cloud_id} />
          ) : null}
        </div>
      </div>
    </>
  )
}

export default Scans
