import styles from './IncidentCard.module.scss'
import lowIcon from '../../assets/icons/low mini.png'
import mediumIcon from '../../assets/icons/medium mini.png'
import highIcon from '../../assets/icons/high mini.png'
import criticalIcon from '../../assets/icons/critical mini.png'
import { Vulnerability } from '@data/types'
import { format } from 'date-fns'
import React from 'react'

export interface IncidentCardProps {
  id?: string
  AccountId: string
  Category: string
  CloudService: string
  HasMfa: boolean
  IamUser: string
  Region: string
  Severity: Vulnerability
  VulnerabilityDate: string
  VulnerabilityDescription: string
  VulnerabilityDoc: string
  VulnerabilityId: string
  SecurityExceptionComment?: string
  SecurityGroupId: string
  IsSilentVulnerability?: string
  isActive: boolean
  onClick?: (incident: any) => any
}

export const severityIcons = {
  CRITICAL: criticalIcon,
  HIGH: highIcon,
  MEDIUM: mediumIcon,
  LOW: lowIcon,
}

const IncidentCard: React.FC<IncidentCardProps> = ({
  VulnerabilityDescription,
  VulnerabilityDate,
  Severity,
  VulnerabilityId,
  onClick,
  isActive,
}) => {
  return (
    <div className={`${styles.card}  ${isActive ? styles.active : null}`} onClick={onClick}>
      <div>
        <img src={severityIcons[Severity]} alt={'Risk icon'} />
      </div>
      <div className={styles.text}>
        <span className={styles.description}>{VulnerabilityDescription}</span>
        <span className={styles.id}>{VulnerabilityId}</span>
      </div>
      <div className={styles.data}>{!!VulnerabilityDate && <span>{format(new Date(VulnerabilityDate), 'dd MMM, yy hh:mm a')}</span>}</div>
    </div>
  )
}

export default IncidentCard
