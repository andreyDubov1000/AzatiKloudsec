import React from 'react';
import { Box, FormControl, MenuItem, Select, } from "@material-ui/core";
import classNames from "classnames";
import './SingleSelect.scss';

interface SingleSelectData {
  id: string | number;
  title: string;
  value: string;
}

interface SingleSelectPropsTypes {
  items: SingleSelectData[];
  className?: string;
  type?: 'filled' | 'outlined';
  onChange?: (activeSelect: SingleSelectData) => any;
}

const SingleSelect = ({ items, onChange, className, type = 'filled' }: SingleSelectPropsTypes) => {
  const [data, setData] = React.useState(items);
  const [activeSelect, setActiveSelect] = React.useState(data[0]);

  const handleChange = (event: any) => {
    const newActiveSelect = data.find((data) => data.value === event.target.value)
    if (newActiveSelect) {
      setActiveSelect(newActiveSelect);
      if (typeof onChange === 'function') {
        onChange(newActiveSelect)
      }
    }
  };

  return (
    <Box className={classNames('singleSelect',
      { ['singleSelect__filled']: type === 'filled' },
      { ['singleSelect__outlined']: type === 'outlined' },
      className)}>
      <FormControl fullWidth>
        <Select value={activeSelect.value} label={activeSelect.title} onChange={handleChange}>
          {data.map(({ title, value, id }) => <MenuItem key={id} value={value}>{title}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SingleSelect;
