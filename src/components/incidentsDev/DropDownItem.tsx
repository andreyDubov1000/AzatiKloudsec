import React from 'react'
import { ReactComponent as ArrowUp } from 'assets/icons/arrow up mini.svg'
import { ReactComponent as ArrowDown } from 'assets/icons/arrow down mini.svg'

interface IDropDownItemProps extends React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  title: string
  dateOrder?: 'asc' | 'desc' | null
}

const DropDownItem: React.FC<IDropDownItemProps> = ({ title, dateOrder = null, ...props }) => {
  return (
    <li {...props}>
      <span>{title}</span>
      {!dateOrder ? null : dateOrder === 'desc' ? <ArrowDown /> : <ArrowUp />}
    </li>
  )
}
export default DropDownItem
