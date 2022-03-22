import React, { useEffect } from 'react'
import { Box, FormControl, MenuItem, Select } from '@material-ui/core'
import classNames from 'classnames'
import './SingleSelect.scss'

export interface SingleSelectData {
  id: string | number
  title: string
  value: string
}

interface SingleSelectPropsTypes {
  items: SingleSelectData[]
  className?: string
  type?: 'filled' | 'outlined'
  onChange?: (select: SingleSelectData) => any
  selectedTitle?: string
}

const SingleSelect = ({ items, onChange, className, type = 'filled', selectedTitle }: SingleSelectPropsTypes) => {
  const [data, setData] = React.useState(items)
  const [activeSelect, setActiveSelect] = React.useState(data[0])

  const handleChange = (event: any) => {
    const newSelect = data.find((data) => data.value === event.target.value)
    if (newSelect) {
      setActiveSelect(newSelect)
      if (typeof onChange === 'function') {
        onChange(newSelect)
      }
    }
  }
  useEffect(() => {
    if (selectedTitle && activeSelect.title !== selectedTitle) {
      const newSelected = data.find((item) => item.title === selectedTitle)
      if (newSelected) setActiveSelect(newSelected)
    }
  }, [selectedTitle])

  return (
    <Box
      className={classNames(
        'singleSelect',
        { ['singleSelect__filled']: type === 'filled' },
        { ['singleSelect__outlined']: type === 'outlined' },
        className
      )}
    >
      <FormControl fullWidth>
        <Select value={activeSelect.value} label={activeSelect.title} onChange={handleChange}>
          {data.map(({ title, value, id }) => (
            <MenuItem key={id} value={value}>
              {title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SingleSelect
