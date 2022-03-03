import React, { ChangeEvent, useEffect, useState } from 'react';
import { ReactComponent as PasswordShow } from 'assets/icons/password-show.svg'
import { ReactComponent as PasswordHide } from 'assets/icons/password-hide.svg'
import { InputAdornment, TextField } from "@material-ui/core";
import classNames from "classnames";
import './InputField.scss'

interface InputFieldPropTypes {
  type?: 'email' | 'password' | 'text';
  className?: string;
  value?: string;
  fullWidth?: boolean;
  placeholder?: string;
  name?: string;
  margin?: 'none' | 'dense' | 'normal';
  visibilityIcon?: boolean;
  onChange?: (value: string) => any;
}

const InputField = (
  {
    type,
    className,
    onChange,
    value = '',
    placeholder,
    margin,
    fullWidth = true,
    name,
    visibilityIcon = false
  }: InputFieldPropTypes) => {
  const [fieldValue, setFieldValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);
  const [newType, setNewType] = useState(type);

  useEffect(() => {
    checkType();
  }, [showPassword])

  const checkType = () => {
    if (type === 'email') setNewType('email');
    if (type === 'password') showPassword ? setNewType('text') : setNewType('password');
  }

  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = event.target.value
    setFieldValue(newValue);
    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField className={classNames('customInputField', { ['customInputField--filled']: fieldValue }, className)}
               name={name}
               placeholder={placeholder}
               type={newType}
               margin={margin}
               fullWidth={fullWidth}
               value={fieldValue}
               onChange={onChangeHandler}
               InputProps={{
                 endAdornment: visibilityIcon && (
                   <InputAdornment
                     className={'customInputField__passwordIcon'}
                     position="start"
                     onClick={handleClickShowPassword}>
                     {showPassword ? <PasswordHide /> : <PasswordShow />}
                   </InputAdornment>)
               }}
    />
  )
};

export default InputField;
