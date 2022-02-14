import React, { useState } from 'react'
import styles from './DropDownMenu.module.css'
import DropDownItem from './DropDownItem'
import { dropDownAccounts, idAccType } from './incidentAccounts'
import { useLocalStorage } from './useLocalStorage'

const DropDownMenu = () => {
  const [savedSelectedAcc, setSavedSelectedAcc] = useLocalStorage<idAccType>(null, 'selectedAcc')
  const [savedSelectedDateOrder, setSavedSelectedDateOrder] = useLocalStorage<'asc' | 'desc'>('desc', 'selectedDateOrder')
  const [dateOrder, setDateOrder] = useState(savedSelectedDateOrder)
  const [accId, setAccId] = useState(savedSelectedAcc)

  const onAccClick = (event: React.MouseEvent) => {
    const item: Element = event.currentTarget
    let nameAcc = item.getAttribute('data-account') as idAccType

    if (nameAcc === accId) nameAcc = null
    setAccId(nameAcc)
    setSavedSelectedAcc(nameAcc)
  }

  const onDateOrderClick = () => {
    const newDateOrder = dateOrder === 'desc' ? 'asc' : 'desc'
    setDateOrder(newDateOrder)
    setSavedSelectedDateOrder(newDateOrder)

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
