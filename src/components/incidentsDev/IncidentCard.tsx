import styles from './IncidentCard.module.scss'
import { SeverityType } from '@data/types'
import { format } from 'date-fns'
import React from 'react'
import { severityIcons } from '@data/constants'

export interface IncidentCardTypes {
  id?: string
  AccountId: string
  Category: string
  CloudService: string
  HasMfa: boolean
  IamUser: string
  Region: string
  Severity: SeverityType
  VulnerabilityDate: string
  VulnerabilityDescription: string
  VulnerabilityDoc: string
  VulnerabilityId: string
  ResourceVulnerabilityId: string
  SecurityGroupId: string
  IsSilentVulnerability?: string
  AwsAccount: string
  SecurityExceptionAuthor?: string
  SecurityExceptionComment?: string
  SecurityExceptionDate?: string
  SecurityExceptionId?: string
}
interface IncidentCardProps extends IncidentCardTypes {
  onClick?: (incident: any) => any
  isActive: boolean
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
