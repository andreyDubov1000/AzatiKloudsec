import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import styles from './UserPayments.module.scss'
import classNames from 'classnames'
import ScrollBar from 'react-perfect-scrollbar'
import UserInformationCard from './UserInfoCard'

type UserPaymentsPropsType = {}

const UserPayments: React.FC<UserPaymentsPropsType> = () => {
  return (
    <div className={styles.main}>
      <div className={styles.payment}></div>
      <div className={styles.checks}></div>
      <div className={styles.history}></div>
    </div>
  )
}

export default UserPayments
