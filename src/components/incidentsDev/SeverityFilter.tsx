import React from 'react'
import styles from './Incidents.module.css'
import { SeverityType, Vulnerability } from './useSeverityFilter'
import RiskButton from '../elements/RiskButton/RiskButton'

interface ISeverityFilter {
  handler: (e: any) => any
  hasSeverityArr: number[]
  severitySet: Set<SeverityType>
}

const SeverityFilter = ({ handler, hasSeverityArr, severitySet }: ISeverityFilter) => {
  return (
    <div className={styles.severity_container}>
      {Vulnerability.map((item, i) => {
        return (
          <RiskButton
            key={item}
            variant={'circle'}
            risk={item.toLowerCase() as 'low' | 'medium' | 'high' | 'critical'}
            onClick={handler}
            disabled={!hasSeverityArr[i]}
            showAsClicked={!!severitySet.size && severitySet.has(item)}
          />
        )
      })}
    </div>
  )
}

export default SeverityFilter
