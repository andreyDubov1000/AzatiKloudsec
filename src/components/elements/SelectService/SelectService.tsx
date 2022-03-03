import React, { useEffect, useMemo, useState } from 'react'
import './SelectService.scss'
import classNames from 'classnames'
import { Autocomplete, TextField, Checkbox, Popper, PopperProps } from '@material-ui/core'
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons'
import awsServiceList from '@data/awsServiceList'

const ServiceIconsUrl = (option: ServiceListItemType) => `/assets/images/icons/${option.value}_32.svg`

type ServiceListItemType = { label: string; value: string }

interface SelectServiceTypes {
  onClick?: () => any
  className?: string
  label?: string
  items?: ServiceListItemType[]
  iconsUrl?: typeof ServiceIconsUrl
}

const SelectService = ({
  items = awsServiceList,
  label = 'Cloud service',
  iconsUrl = ServiceIconsUrl,
  className,
  onClick,
}: SelectServiceTypes) => {
  const [checkedList, setCheckedList] = useState<ServiceListItemType[]>([])
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false)

  const selectOptions = useMemo(
    () => [
      {
        label: 'Select All',
        value: 'all',
      },
      ...items,
    ],
    [items]
  )

  useEffect(() => {
    items.length === checkedList.length ? setIsAllSelected(true) : setIsAllSelected(false)
  }, [checkedList.length])

  //const allSelected = items.length === checkedList.length

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setCheckedList(items)
    } else {
      setCheckedList([])
    }
  }

  const handleChange = (e: any, list: ServiceListItemType[], reason: string) => {
    if (list.find((option) => option.value === 'all')) {
      if (reason === 'remove-option') {
        const result = list.filter((el) => el.value !== 'all')
        setCheckedList(result)
      } else {
        handleSelectAll(!isAllSelected)
      }
      return
    }
    setCheckedList(list)
  }

  return (
    <div onClick={onClick} className={classNames(className, 'autocomplete_root')}>
      <Autocomplete
        multiple
        size='small'
        limitTags={1}
        disablePortal
        value={checkedList}
        PopperComponent={PopperMy}
        disableCloseOnSelect
        includeInputInList
        getOptionDisabled={(option) => (isAllSelected ? option.value !== 'all' : false)}
        isOptionEqualToValue={(first, second) => first.value === second.value}
        options={selectOptions}
        renderInput={(params) => (
          <TextField {...params} margin='none' label={!!checkedList.length ? 'Service type' : label} variant='outlined' />
        )}
        renderOption={(props, option, { selected }) => {
          const selectAllProps = option.value === 'all' ? { checked: isAllSelected } : {}
          return (
            <li {...props}>
              <div>
                {option.value !== 'all' && <img src={iconsUrl(option)} alt={option.value} />}
                <span>{option.label}</span>
              </div>
              <Checkbox
                icon={<CheckBoxOutlineBlank fontSize='small' />}
                checkedIcon={<CheckBox fontSize='small' />}
                checked={isAllSelected || selected}
                {...selectAllProps}
              />
            </li>
          )
        }}
        onChange={handleChange}
      />
    </div>
  )
}

const PopperMy = (props: PopperProps) => {
  return <Popper {...props} style={{ width: 240 }} placement='bottom-start' />
}
export default SelectService
