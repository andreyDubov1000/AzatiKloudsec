import React, { useState } from 'react'
import styles from './Scans.module.scss'
import ScansRow from './ScansRow'
import awsServiceList from '@data/awsServiceList'
import { EmptyList, PaginationSimple } from '@component/elements'
import { IAccount } from './Scans'
import ScrollBar from 'react-perfect-scrollbar'

const scanOptions = [...awsServiceList]

interface ScanListAccPropsType {
  accountList: IAccount[]
  user_id: string | undefined
  cloud_id: string | undefined
}

const ScanListAcc: React.FC<ScanListAccPropsType> = ({ accountList, user_id, cloud_id }) => {
  const [book, setBook] = useState<typeof accountList>([])

  return (
    <div className={styles.accounts}>
      {!accountList.length ? (
        <EmptyList />
      ) : (
        <>
          <div className={styles.accounts_list}>
            <h3>Accounts</h3>
            <ScrollBar className={styles.scrollBar}>
              {book.map((item: IAccount) => (
                <ScansRow {...item} user_Id={user_id} cloud_id={cloud_id} key={item.AccountId} />
              ))}
            </ScrollBar>
          </div>

          <PaginationSimple accountList={accountList} numOnPage={20} setBook={setBook} storageKey={'Scan'} />
        </>
      )}
    </div>
  )
}

export default ScanListAcc
