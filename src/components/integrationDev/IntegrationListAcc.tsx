import { IAccount } from '@component/scansDev/Scans'
import { useAppSelector } from '@redux/hooks'
import React, { useEffect, useState } from 'react'
import styles from '../scansDev/Scans.module.scss'
import { EmptyList, PaginationSimple } from '@component/elements'
import IntegrationRow from './IntegrationRow'
import ScrollBar from 'react-perfect-scrollbar'

interface IntegrationPropsType {
  accountList: IAccount[]
  loading: boolean
  user_id: string | undefined
  cloud_id: string | undefined
}

const IntegrationListAcc: React.FC<IntegrationPropsType> = ({ accountList, loading, user_id, cloud_id }) => {
  const [book, setBook] = useState<typeof accountList>([])

  return (
    <div className={styles.accounts}>
      {!accountList.length ? (
        <EmptyList />
      ) : (
        <>
          <div className={styles.accounts_list}>
            <h3>
              <p>Accounts</p>
              <p>CF template version</p>
              <p>Reachability</p>
              <p>Actions</p>
            </h3>
            <ScrollBar className={styles.scrollBar}>
              {book.map((item: IAccount) => (
                <IntegrationRow {...item} user_Id={user_id} cloud_id={cloud_id} key={item.AccountId} />
              ))}
            </ScrollBar>
          </div>
          <PaginationSimple accountList={accountList} numOnPage={20} setBook={setBook} storageKey={'Integration'} />
        </>
      )}
    </div>
  )
}

export default IntegrationListAcc
