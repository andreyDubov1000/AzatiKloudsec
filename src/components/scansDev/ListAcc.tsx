import React, { cloneElement, Component, useState } from 'react'
import styles from './Scans.module.scss'
import { EmptyList, PaginationSimple } from '@component/elements'
import { IAccount } from './Scans'
import ScrollBar from 'react-perfect-scrollbar'

interface ScanListAccPropsType {
  accountList: IAccount[]
  rowComponent: React.ReactElement<any>
  headers?: string[]
  rowOnPage?: number
  keyToSaveRowOnPage?: string
}

const ListAcc: React.FC<ScanListAccPropsType> = ({ accountList, rowComponent, headers, rowOnPage, keyToSaveRowOnPage }) => {
  const [book, setBook] = useState<typeof accountList>([])

  return (
    <div className={styles.accounts}>
      {!accountList.length ? (
        <EmptyList />
      ) : (
        <>
          <div className={styles.accounts_list}>
            <h3>{headers ? headers.map((header) => <p key={header}>{header}</p>) : ''}</h3>
            <ScrollBar className={styles.scrollBar}>{book.map((item, i) => cloneElement(rowComponent, { key: i, ...item }))}</ScrollBar>
          </div>
          <PaginationSimple accountList={accountList} numOnPage={rowOnPage} setBook={setBook} storageKey={keyToSaveRowOnPage} />
        </>
      )}
    </div>
  )
}

export default ListAcc
