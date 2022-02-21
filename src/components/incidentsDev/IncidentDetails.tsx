import { vulnerabilityColor } from '@data/constants'
import React, { useState } from 'react'
import ScrollBar from 'react-perfect-scrollbar'
import ErrorDetails from './ErrorDetails'
import ErrorFix from './ErrorFix'
import { IncidentCardProps, severityIcons } from './IncidentCard'
import Tabs from './Tab'
import styles from './Incidents.module.css'

export interface IncidentDetailsProps {
  incident: Omit<IncidentCardProps, 'sx'>
  setIncidentList?: any
}

const IncidentDetails: React.FC<IncidentDetailsProps> = ({ incident, setIncidentList }) => {
  return (
    <div className={styles.incident_details}>
      <h3>{incident?.VulnerabilityDescription} </h3>
      <div className={styles.Details_title}>
        <img src={severityIcons[incident?.Severity]} />
        <span> {incident?.Severity}</span>
        {/* <div className={styles.devider}>|</div> */}
        <span>Error code:</span>
        <span>{incident?.VulnerabilityId}</span>
      </div>

      <Tabs first={<ErrorDetails {...incident} setIncidentList={setIncidentList} />} second={<ErrorFix {...incident} />} />
    </div>
  )
}

export default IncidentDetails
