import { useCallback, useEffect, useRef, useState } from 'react'

export function useInfinityPagination<T>(list: T[], cardsOnPage: number) {
  const [pageNum, setPageNum] = useState(1)
  const [book, setBook] = useState<T[]>([])
  const totalCardsNum = list.length - 1
  const hasMore = totalCardsNum / cardsOnPage > pageNum
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    const newBook = list.slice(0, pageNum * cardsOnPage)
    setBook(newBook)
  }, [pageNum, cardsOnPage, list])

  const lastBookElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNum((prev) => prev + 1)
          }
        },
        {
          root: null,
          rootMargin: '-50px',
          threshold: 0.1,
        }
      )
      if (node) observer.current.observe(node)
    },
    [hasMore]
  )

  return [book, lastBookElementRef, setPageNum] as const
}
