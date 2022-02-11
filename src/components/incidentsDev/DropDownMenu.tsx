import React, { useState } from 'react'
import styles from './DropDownMenu.module.css'

import { ReactComponent as DropdownIcon } from '../../assets/Dropdown.svg'
import DropDownItem from './DropDownItem'
import { dropDownAccounts, idAccType } from './incidentAccounts'

const DropDownMenu = () => {
  const [accId, setAccId] = useState<idAccType>(null)
  const [dateOrder, setDateOrder] = useState<'asc' | 'desc'>('desc')

  const onAccClick = (event: React.MouseEvent) => {
    const item: Element = event.currentTarget
    const selectedAcc = item.getAttribute('data-account') as idAccType
    selectedAcc === accId ? setAccId(null) : setAccId(selectedAcc)
  }

  const onDateOrderClick = (event: React.MouseEvent) => {
    setDateOrder(dateOrder === 'desc' ? 'asc' : 'desc')

    // sortList('VulnerabilityDate', dateOrder || 'asc')
  }

  return (
    <div className={styles.dropdown}>
      <div className={`${styles.menu_handler} ${accId && styles.active} `}></div>
      <ul className={styles.menu_list}>
        <DropDownItem title={'Sort by date'} dateOrder={dateOrder} onClick={onDateOrderClick} />
        <DropDownItem title={'Sort by accounts'} className={styles.sub_menu_handler} />
        <ul className={styles.sub_menu_list}>
          {dropDownAccounts.map((item) => (
            <DropDownItem
              key={item.idAcc}
              title={item.title}
              data-account={item.idAcc}
              onClick={onAccClick}
              className={item.idAcc === accId ? styles.selected : undefined}
            />
          ))}
        </ul>
      </ul>
    </div>
  )
}

export default DropDownMenu
