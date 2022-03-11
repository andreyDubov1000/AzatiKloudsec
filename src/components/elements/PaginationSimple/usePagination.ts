import { useState, useEffect, useCallback } from 'react'

function usePagination<T>(list: T[], rawsOnPage: number) {
  const [pageNum, setPageNum] = useState<number>(1)
  const [book, setBook] = useState<T[]>([])
  const totalRawNum = list.length - 1
  const totalPages = Math.ceil(totalRawNum / rawsOnPage)

  useEffect(() => {
    const newBook = list.slice((pageNum - 1) * rawsOnPage, pageNum * rawsOnPage)
    setBook(newBook)
  }, [pageNum, rawsOnPage, list])

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
