import React, { useEffect } from 'react'
import usePagination from './usePagination'
import { ReactComponent as ChevronL } from 'assets/icons/chevron-up-Regular.svg'
import { ReactComponent as ChevronR } from 'assets/icons/chevron-down-Regular.svg'
import styles from './PaginationSimple.module.scss'

interface PaginationSimplePropsType {
  accountList: any[]
  numOnPage: number
  setBook: React.Dispatch<any[]>
}

const PaginationSimple: React.FC<PaginationSimplePropsType> = ({ accountList, numOnPage, setBook }) => {
  const { book, pageNum, totalPages, onNextPage, onPrevPage } = usePagination(accountList, numOnPage)

  useEffect(() => {
    setBook(book)
  }, [book])

  return (
    <div className={styles.pagination}>
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
  )
}

export default PaginationSimple
