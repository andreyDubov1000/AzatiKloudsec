import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './CommentForm.module.scss';

interface CommentFormPropTypes {
  name?: string;
  id?: string;
  cols?: number;
  rows?: number;
  placeholder?: string;
  onChange?: (value: string) => any;
}

const CommentForm = ({ onChange, placeholder, name, id, cols, rows }: CommentFormPropTypes) => {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const changeHandler = (el: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(el.target.value);

    if (typeof onChange === 'function') {
      onChange(el.target.value);
    }
  };

  const blurHandler = () => {
    if (value) return;
    setFocused(false);
  };

  return (
    <p className={styles.commentForm}>
      <label className={classNames(styles.placeholder, { [styles.focused]: focused })} htmlFor={id}>
        {placeholder}
      </label>
      <textarea
        onFocus={() => setFocused(true)}
        onBlur={blurHandler}
        className={classNames(styles.textArea, { [styles.focusedArea]: focused })}
        onChange={changeHandler}
        value={value}
        name={name}
        id={id}
        cols={cols}
        rows={rows}></textarea>
    </p>
  );
};

export default CommentForm;
