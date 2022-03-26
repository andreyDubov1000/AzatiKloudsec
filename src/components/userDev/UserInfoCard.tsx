import React, { useCallback } from 'react'
import styles from './UserInfoCard.module.scss'
import { ReactComponent as Expand } from 'assets/icons/expand-normal.svg'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'

interface UserInformationCardPropType {
  className?: string
  toPage: string
  onExpendClick?: (e: React.MouseEvent<HTMLDivElement>) => any
}

const UserInformationCard: React.FC<UserInformationCardPropType> = ({ className = '', onExpendClick, children, toPage }) => {
  const history = useHistory()

  const onCardExpendClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (typeof onExpendClick === 'function') onExpendClick(event)
    console.log(history.location.pathname, toPage)

    history.push(toPage)
    console.log(history.location.pathname)
  }

  return (
    <div className={classNames(styles.user_card, className)}>
      <div className={styles.card_icon} onClick={onCardExpendClick}>
        <Expand className={styles.expend} />
      </div>
      {children}
    </div>
  )
}

export default UserInformationCard
