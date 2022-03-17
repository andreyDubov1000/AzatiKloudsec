import classNames from 'classnames'
import React from 'react'
import { Button } from 'react-bootstrap'
import styles from './RiskButton.module.scss'

type RiskButtonPropsType = {
  children?: number | string
  showAsClicked?: boolean
  inactive?: boolean
  disabled?: boolean
  onClick?: (e?: any) => any
  className?: string
  variant?: 'big' | 'small' | 'circle' | 'ring' | 'transparent'
  risk?: 'low' | 'medium' | 'high' | 'critical'
}

const RiskButton = ({
  children,
  showAsClicked,
  onClick,
  className,
  inactive,
  disabled,
  risk = 'low',
  variant = 'big',
}: RiskButtonPropsType) => {
  return (
    <Button
      data-risk={risk}
      disabled={disabled}
      className={classNames(
        styles.button,
        showAsClicked && styles.asClicked,
        styles[variant],
        styles[risk],
        inactive && 'inactive',
        className
      )}
      onClick={onClick}
    >
      {variant === 'big' && `${children} ${risk}`}
      {variant === 'small' && children}
      {variant === 'transparent' && children}
    </Button>
  )
}

export default RiskButton
