import { useStateSafe } from '@component/incidentsDev/hooks/useStateSafe'
import styles from './Security.module.scss'
import React, { useEffect, useMemo, useState } from 'react'
import { Calendar, SingleSelect } from '@component/elements'
import { cloudList } from '@data/constants'
import { SingleSelectData } from '@component/elements/SingleSelect/SingleSelect'
import SeverityFilter from '@component/incidentsDev/SeverityFilter'
import { SeverityType } from '@data/types'

interface SecurityHeaderType {
  onSelectCloud: (a: SingleSelectData) => any
  onSelectDate: (a: Date | null) => any
  initialDate: Date | null
  severitySet: Set<SeverityType>
  onSelectSeverity: (event: React.MouseEvent) => any
}

const SecurityHeader: React.FC<SecurityHeaderType> = ({ onSelectCloud, onSelectDate, initialDate, onSelectSeverity, severitySet }) => {
  const [loading, setLoading] = useStateSafe(true)

  const listOfCloud = useMemo(() => cloudList('security'), [])

  return (
    <>
      <div className={styles.header}>
        <SingleSelect className={styles.select} items={listOfCloud} type='outlined' onChange={onSelectCloud} />
        <div className={styles.calendar}>
          <Calendar initialDate={initialDate} onChange={onSelectDate} type='outlined' />
        </div>
        <div className={styles.severity}>
          <SeverityFilter className={styles.severity} buttonVariant={'transparent'} handler={onSelectSeverity} severitySet={severitySet} />
        </div>
      </div>
    </>
  )
}

export default SecurityHeader
