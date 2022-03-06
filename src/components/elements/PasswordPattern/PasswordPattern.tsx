import React from 'react'
import styles from './PasswordPattern.module.scss'
import { ReactComponent as IconError } from 'assets/icons/IconsError.svg'
import { ReactComponent as IconNoneError } from 'assets/icons/IconsErrorNone.svg'

interface PasswordPatternType {
  descriptions: string[]
  value: string
  errors: string | undefined
}
const PasswordPattern: React.FC<PasswordPatternType> = ({ descriptions, value, errors }) => {
  const switcherStrengthClass = (value: string) => {
    const Strength = ['', 'Weak', 'Fair', 'Good', 'Strong']
    // same value strength handler
    return Strength[value.length % 5].trim()
  }

  const checkDescription = (description: string, errors: string | string[] | undefined, value: string) => {
    console.log(errors)
    return errors ? errors.includes(description) : !value
  }

  return (
    <div className={styles.password_pattern}>
      <div className={styles.strength}>
        <div className={`${styles.bars} ${styles[switcherStrengthClass(value)]}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${styles.label} ${styles[switcherStrengthClass(value)]}`}>
          <span>Password Strength:</span>
          <span>{switcherStrengthClass(value) || 'Very Weak'}</span>
        </div>
        <div className={styles.description}>
          {descriptions.map((desc) => (
            <div key={desc}>
              {checkDescription(desc, errors, value) ? <IconError /> : <IconNoneError />}
              <span>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PasswordPattern
