import React from 'react'
import styles from './SeverityFilter.module.css'

interface ISeverityFilter extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  handlers?: ((e: Event) => void)[]
}

const SeverityFilter: React.FC<ISeverityFilter> = ({ handlers, ...props }) => {
  const Vulnerability = ['low', 'medium', 'high', 'critical']

  return (
    <div className={styles.container}>
      {Vulnerability.map((item) => {
        return (
          <div key={item}>
            <input type={'button'} className={styles[item]} {...props} />
          </div>
        )
      })}
    </div>
  )
}

export default SeverityFilter
