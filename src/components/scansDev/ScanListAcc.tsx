import React, { useState } from 'react'
import styles from './Scans.module.scss'
import ScansRow from './ScansRow'
import awsServiceList from '@data/awsServiceList'
import { EmptyList, PaginationSimple } from '@component/elements'
import { IAccounts } from './Scans'

const scanOptions = [
  {
    label: 'All',
    value: 'all',
  },
  ...awsServiceList,
]

interface ScanListAccPropsType {
  accountList: IAccounts[]
  user_id: string | undefined
  cloud_id: string | undefined
}

const ScanListAcc: React.FC<ScanListAccPropsType> = ({ accountList, user_id, cloud_id }) => {
  //const { book, pageNum, totalPages, onNextPage, onPrevPage } = usePagination(accountList, 10)
  const [book, setBook] = useState<typeof accountList>([])

  return (
    <div className={styles.accounts}>
      {!accountList.length ? (
        <EmptyList />
      ) : (
        <>
          <h3>Accounts</h3>
          <div className={styles.accounts_list}>
            {book.map((item: any) => (
              <ScansRow {...item} scanOptions={scanOptions} user_Id={user_id} cloud_id={cloud_id} key={item.AccountId} />
            ))}
          </div>
          <PaginationSimple accountList={accountList} numOnPage={10} setBook={setBook} />
        </>
      )}
    </div>
  )
}

export default ScanListAcc
