import React from 'react'
import styles from './Incidents.module.css'
import { Vulnerability } from './useSeverityFilter'
import RiskButton from '../elements/RiskButton/RiskButton'

interface ISeverityFilter extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  handler: (e: any) => any
  hasSeverityArr: number[]
}

const SeverityFilter = ({ handler, hasSeverityArr, ...props }: ISeverityFilter) => {
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
          />
        )
      })}
    </div>
  )
}

export default SeverityFilter
