import React, { useEffect, useRef } from 'react'
import styles from './EmptyList.module.scss'
import classNames from 'classnames'

interface EmptyListPropsType {
  handlerClick?: (e: any) => any
  className?: string
}
const EmptyList: React.FC<EmptyListPropsType> = ({ handlerClick = () => {}, className }) => {
  const refBox = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = refBox.current
    element?.addEventListener('click', handlerClick)
    return () => {
      element?.removeEventListener('click', handlerClick)
    }
  }, [handlerClick])

  return (
    <div className={classNames(styles.empty_list, className)}>
      <span>No account has been integrated.</span>
      <span>Click here to add your first account.</span>
      <div ref={refBox}></div>
    </div>
  )
}

export default EmptyList
