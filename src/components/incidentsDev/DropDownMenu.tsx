import React from 'react'
import styles from './DropDownMenu.module.css'
import DropDownItem from './DropDownItem'
import { dropDownAccounts } from './useSelectedAccCloud'

interface IDropDownMenu {
  dateOrder: 'asc' | 'desc'
  handleDateSort: (event: React.MouseEvent) => any
  onAccCloudClick: (event: React.MouseEvent) => any
  accCloud: string
}

const DropDownMenu = ({ dateOrder, handleDateSort, onAccCloudClick, accCloud }: IDropDownMenu) => {
  const accService = 'AZU'

  return (
    <div className={styles.dropdown}>
      <div className={`${styles.menu_handler} ${accService && styles.active} `}></div>
      <ul className={styles.menu_list}>
        <DropDownItem title={'Sort by date'} dateOrder={dateOrder} onClick={handleDateSort} />
        <DropDownItem title={'Sort by accounts'} className={styles.sub_menu_handler} />
        <ul className={styles.sub_menu_list}>
          {dropDownAccounts.map((item) => (
            <DropDownItem
              key={item.idAcc}
              title={item.title}
              data-account={item.idAcc}
              onClick={onAccCloudClick}
              className={item.idAcc === accCloud ? styles.selected : undefined}
            />
          ))}
        </ul>
      </ul>
    </div>
  )
}

export default DropDownMenu
