import React, { useCallback, useEffect, useMemo, useState } from 'react'
import usePagination from './usePagination'
import { ReactComponent as ChevronL } from 'assets/icons/chevron-up-Regular.svg'
import { ReactComponent as ChevronR } from 'assets/icons/chevron-down-Regular.svg'
import styles from './PaginationSimple.module.scss'
import { SingleSelect } from '@component/elements'
import { useLocalStorage } from '@component/incidentsDev/hooks/useLocalStorage'
import classNames from 'classnames'

interface PaginationSimplePropsType {
  accountList: any[]
  numOnPage?: number
  setBook: React.Dispatch<any[]>
  className?: string
  storageKey: string
}

const PaginationSimple: React.FC<PaginationSimplePropsType> = ({ accountList, numOnPage, setBook, className, storageKey }) => {
  const [rowOnPage, setRowOnPage] = useLocalStorage(numOnPage || 10, `rowOnPage-${storageKey}`)
  const { book, pageNum, totalPages, onNextPage, onPrevPage } = usePagination(accountList, rowOnPage)

  useEffect(() => {
    setBook(book)
  }, [book, setBook])

  const pageNumbers = useMemo(
    () => [
      { id: 10, title: '10', value: '10' },
      { id: 20, title: '20', value: '20' },
      { id: 50, title: '50', value: '50' },
    ],
    []
  )

  const onChange = useCallback(
    (newValue: { id: string | number; title: string; value: string }) => {
      setRowOnPage(Number(newValue.id))
    },
    [setRowOnPage]
  )

  return (
    <div className={classNames(styles.pagination, className)}>
      {!numOnPage ? (
        <div className={styles.selectRowNumbers}>
          <SingleSelect items={pageNumbers} type='filled' onChange={onChange} />
        </div>
      ) : null}
      <div className={styles.pageNumber}>
        <p onClick={onPrevPage}>
          <ChevronL />
        </p>
        <span>{pageNum}</span>
        <span>/</span>
        <span>{totalPages}</span>
        <p onClick={onNextPage}>
          <ChevronR />
        </p>
      </div>
    </div>
  )
}

export default PaginationSimple
