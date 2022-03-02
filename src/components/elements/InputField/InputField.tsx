import React, { ChangeEvent, useState } from 'react';
import { TextField } from "@material-ui/core";
import classNames from "classnames";
import './InputField.scss'

interface InputFieldPropTypes {
  type?: 'email' | 'password' | string;
  className?: string;
  value?: string;
  fullWidth?: boolean;
  placeholder?: string;
  name?: string;
  onChange?: (value: string) => any;
}

const InputField = ({ type, className, onChange, value = '', placeholder, fullWidth = true, name }: InputFieldPropTypes) => {
  const [fieldValue, setFieldValue] = useState(value);

  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newValue = event.target.value
    setFieldValue(newValue);
    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  }

  const onBlurHandler = () => {}

  return (
    <TextField className={classNames('customInputField', {['customInputField--filled']: fieldValue}, className)}
               name={name}
               placeholder={placeholder}
               type={type}
               fullWidth={fullWidth}
               value={fieldValue}
               onChange={onChangeHandler}
               onBlur={onBlurHandler}

    />
  )
};

export default InputField;
