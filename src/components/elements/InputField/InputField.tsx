import React, { useEffect, useState } from 'react'
import { ReactComponent as PasswordShow } from 'assets/icons/password-show.svg'
import { ReactComponent as PasswordHide } from 'assets/icons/password-hide.svg'
import { InputAdornment, TextField } from '@material-ui/core'
import classNames from 'classnames'
import './InputField.scss'

interface InputFieldPropTypes {
  id?: string
  disabled?: boolean
  type?: 'email' | 'password' | 'text'
  className?: string
  value?: string
  fullWidth?: boolean
  placeholder?: string
  name?: string
  margin?: 'none' | 'dense' | 'normal'
  visibilityIcon?: boolean
  helperText?: string | boolean
  isError?: boolean
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void
  }
  onChange?: {
    (e: React.ChangeEvent<any>): void
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void
  }
}

const InputField = ({
  id,
  disabled = false,
  type = 'text',
  className,
  onChange,
  onBlur,
  value = '',
  placeholder,
  margin = 'normal',
  fullWidth = true,
  name,
  helperText,
  isError,
  visibilityIcon = false,
}: InputFieldPropTypes) => {
  const [showPassword, setShowPassword] = useState(false)
  const [newType, setNewType] = useState(type)

  useEffect(() => {
    checkType()
  }, [showPassword])

  const checkType = () => {
    if (type === 'email') setNewType('email')
    if (type === 'password') showPassword ? setNewType('text') : setNewType('password')
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <TextField
      id={id}
      disabled={disabled}
      className={classNames('customInputField', { ['customInputField--filled']: value }, className)}
      name={name}
      placeholder={placeholder}
      type={newType}
      margin={margin}
      fullWidth={fullWidth}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      helperText={helperText}
      error={isError}
      autoComplete='new-password'
      InputProps={{
        endAdornment: visibilityIcon && (
          <InputAdornment className={'customInputField__passwordIcon'} position='start' onClick={handleClickShowPassword}>
            {showPassword ? <PasswordHide /> : <PasswordShow />}
          </InputAdornment>
        ),
      }}
    />
  )
}

export default InputField
