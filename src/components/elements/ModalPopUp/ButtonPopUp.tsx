import React from 'react'
import styles from './ButtonPopUp.module.css'

interface IButtonPopUp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string
}

const ButtonPopUp: React.FC<IButtonPopUp> = ({ title, ...props }) => {
  return (
    <button type={'button'} className={styles.button_simple} {...props}>
      {title}
    </button>
  )
}

export default ButtonPopUp
