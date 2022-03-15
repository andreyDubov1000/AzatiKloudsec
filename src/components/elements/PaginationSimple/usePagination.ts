import { useState, useEffect, useCallback } from 'react'

function usePagination<T>(list: T[], rowOnPage: number) {
  const [pageNum, setPageNum] = useState<number>(1)
  const [book, setBook] = useState<T[]>([])
  const totalRawNum = list.length - 1
  const totalPages = Math.ceil(totalRawNum / rowOnPage)

  useEffect(() => {
    const newBook = list.slice((pageNum - 1) * rowOnPage, pageNum * rowOnPage)
    setBook(newBook)
  }, [pageNum, rowOnPage, list])

  useEffect(() => {
    setPageNum(1)
  }, [rowOnPage])

  const onNextPage = useCallback(() => {
    setPageNum((prevPage) => {
      return prevPage === totalPages ? 1 : prevPage + 1
    })
  }, [totalPages])

  const onPrevPage = useCallback(() => {
    setPageNum((prevPage) => {
      return prevPage === 1 ? totalPages : prevPage - 1
    })
  }, [totalPages])

  return { book, pageNum, totalPages, onNextPage, onPrevPage }
}

export default usePagination
