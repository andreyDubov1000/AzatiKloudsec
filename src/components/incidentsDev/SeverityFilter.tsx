import React from 'react'
import classNames from 'classnames'
import styles from './SeverityFilter.module.scss'
import { Vulnerability } from './hooks/useSeverityFilter'
import { RiskButton } from '@component/elements'
import { SeverityType } from '@data/types'

interface ISeverityFilterProps {
  handler: (e: React.MouseEvent) => any
  hasSeverityArr?: number[]
  severitySet: Set<SeverityType>
  buttonVariant: 'big' | 'small' | 'circle' | 'ring' | 'transparent'
  className?: string
}

const SeverityFilter = ({ handler, hasSeverityArr, severitySet, buttonVariant, className }: ISeverityFilterProps) => {
  return (
    <div className={classNames(className, styles.severity)}>
      {Vulnerability.map((item, i) => {
        return (
          <RiskButton
            key={item}
            variant={buttonVariant}
            risk={item.toLowerCase() as 'low' | 'medium' | 'high' | 'critical'}
            onClick={handler}
            disabled={hasSeverityArr && !hasSeverityArr[i]}
            showAsClicked={!!severitySet.size && severitySet.has(item)}
          >
            {item.toLowerCase()}
          </RiskButton>
        )
      })}
    </div>
  )
}

export default SeverityFilter
