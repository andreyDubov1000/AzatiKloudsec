import React, { useState } from 'react';
import { TextField } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

interface CommentFormPropTypes {
  id?: string;
  rows?: number;
  fullWidth?: boolean;
  placeholder?: string;
  onChange?: (value: string) => any;
}

const CommentTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    backgroundColor: '#fff',
    '&.Mui-focused': {
      backgroundColor: 'transparent'
    }
  },
  '& label.Mui-focused': {
    color: '#023AE0',
  },
  '&:hover': {
    '& label': {
      color: '#023AE0',
    },
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#ccc',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#023AE0',
    },
  },
})

const CommentForm = ({ onChange, placeholder, id, rows = 4, fullWidth = true }: CommentFormPropTypes) => {
  const [value, setValue] = useState('');

  const changeHandler = (el: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(el.target.value);

    if (typeof onChange === 'function') {
      onChange(el.target.value);
    }
  };

  return (
    <CommentTextField
      id={id}
      label={placeholder}
      multiline
      rows={rows}
      fullWidth={fullWidth}
      value={value}
      onChange={changeHandler}
    />
  );
};

export default CommentForm;
