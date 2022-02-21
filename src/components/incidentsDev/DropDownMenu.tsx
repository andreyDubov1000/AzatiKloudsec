import React from 'react'
import styles from './DropDownMenu.module.css'
import DropDownItem from './DropDownItem'
import { dropDownAccounts } from './useDropDownMenu'

interface IDropDownMenu {
  dateOrder: 'asc' | 'desc'
  handleDateSort: (event: React.MouseEvent) => void
}

const DropDownMenu = ({ dateOrder, handleDateSort }: IDropDownMenu) => {
  const accService = 'AZU'
  const onAccClick = (event: React.MouseEvent) => {
    // const item: Element = event.currentTarget
    // let nameAcc = item.getAttribute('data-account') as AccServiceType
    // if (nameAcc === accService) nameAcc = null
    // setService(nameAcc)
  }

  //const onDateOrderClick = () => {
  // const newDateOrder = dateOrder === 'desc' ? 'asc' : 'desc'
  // setOrder(newDateOrder)
  // sortList('VulnerabilityDate', dateOrder || 'asc')
  // }

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
              onClick={onAccClick}
              className={item.idAcc === accService ? styles.selected : undefined}
            />
          ))}
        </ul>
      </ul>
    </div>
  )
}

export default DropDownMenu
