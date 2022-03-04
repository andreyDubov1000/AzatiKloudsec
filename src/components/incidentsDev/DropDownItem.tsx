import React from 'react'
import { ReactComponent as ArrowUp } from 'assets/icons/arrow up mini.svg'
import { ReactComponent as ArrowDown } from 'assets/icons/arrow down mini.svg'

interface IDropDownItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  title: string
  dateOrder?: boolean
}

const DropDownItem: React.FC<IDropDownItemProps> = ({ title, dateOrder, ...props }) => {
  return (
    <li {...props}>
      <span>{title}</span>
      {dateOrder === undefined ? null : dateOrder ? <ArrowDown /> : <ArrowUp />}
    </li>
  )
}
export default DropDownItem
