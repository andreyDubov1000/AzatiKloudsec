import Loader from '@component/atoms/Loader'
import PageTitle from '@component/atoms/PageTitle'
import { useAppSelector } from '@redux/hooks'
import React, { useEffect, useMemo, useState } from 'react'
import { useGetAccounts } from 'services/integrationsService'
import { SecondMenu } from '@component/elements'
import { cloudList } from '@data/constants'
import styles from './Scans.module.scss'
import { useLocation, useParams } from 'react-router-dom'
import ListAcc from './ListAcc'
import { useStateSafe } from '@component/incidentsDev/hooks/useStateSafe'
import AddAccount from '@component/integrationDev/AddAccount'
import ScrollBar from 'react-perfect-scrollbar'
import ScansRow from './ScansRow'
import IntegrationRow from '@component/integrationDev/IntegrationRow'

export interface IAccount {
  AccountId?: string
  AccountAlias?: string
  CfStackId?: string
  CfTemplateVersion?: string
  KloudsecRoleCfTemplateUpToDate?: boolean
  Reachability?: string
}
const scansListHeaders = ['Accounts']
const integrationListHeaders = ['Accounts', ' CF template version', 'Reachability', 'Actions']

interface ScansPropsType {}

const Scans: React.FC<ScansPropsType> = () => {
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
        const dataList = list.AwsAccounts?.map((item: any) => ({
          id: item.AccountId,
          user_id,
          ...item,
        }))
        setAccountList(dataList)
      }
      setLoading(false)
    }

    getAccountList(user?.user_id, cloud_id)
    return () => {
      if (sourceRefAccounts.current) sourceRefAccounts.current.cancel('Scan cancel getting Accounts list')
    }
  }, [user, cloud_id])

  const menuCloudList = useMemo(() => cloudList(currentPage), [currentPage])

  return (
    <>
      {loading && <Loader />}
      <PageTitle title={`${currentPage} accounts`} />
      <h1 className={styles.title}>{`${currentPage}: ${cloud_id?.toUpperCase() || 'ALL'} accounts`}</h1>
      <div className={styles.scan_layout}>
        <ScrollBar className={styles.cloud_menu}>
          <SecondMenu items={menuCloudList}>{isIntegrations ? <AddAccount user_id={user?.user_id} /> : null}</SecondMenu>
        </ScrollBar>
        <div className={styles.accaunts_tab}>
          {isScanPage ? (
            <ListAcc
              rowOnPage={20}
              accountList={accountList}
              headers={scansListHeaders}
              rowComponent={<ScansRow user_id={user?.user_id} cloud_id={cloud_id} />}
            />
          ) : null}
          {isIntegrations ? (
            <ListAcc
              rowOnPage={20}
              accountList={accountList}
              headers={integrationListHeaders}
              rowComponent={<IntegrationRow user_id={user?.user_id} cloud_id={cloud_id} />}
            />
          ) : null}
        </div>
      </div>
    </>
  )
}

export default Scans
