import classNames from 'classnames'
import React from 'react'
import { Button } from 'react-bootstrap'
import styles from './ButtonSimple.module.scss'

type ButtonSimplePropsType = {
  type?: 'button' | 'reset' | 'submit'
  children?: string | number
  showAsClicked?: boolean
  inactive?: boolean
  disabled?: boolean
  onClick?: (e?: any) => any
  className?: string
}

const ButtonSimple = ({ children, showAsClicked, onClick, className, inactive, disabled, type }: ButtonSimplePropsType) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      className={classNames(styles.button, showAsClicked && styles.asClicked, inactive && styles.inactive, className)}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default ButtonSimple
