import React from 'react'
import styles from './ButtonSimple.module.css'

interface IButtonSimple extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  title?: string
}

const ButtonSimple: React.FC<IButtonSimple> = ({ title, ...props }) => {
  return (
    <button type={'button'} className={styles.button_simple} {...props}>
      {title}
    </button>
  )
}

export default ButtonSimple
