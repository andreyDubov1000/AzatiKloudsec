import styles from './Incidents.module.css'
import React, { useState } from 'react'
import ScrollBar from 'react-perfect-scrollbar'
import IncidentCard, { IncidentCardProps } from './IncidentCard'
import DropDownMenu from './DropDownMenu'
import { ModalPopUp, InputSearch } from '../elements/index'
import SeverityFilter from './SeverityFilter'
import { SeverityType } from './useSeverityFilter'

export interface IncidentListProps {
  incidentList: IncidentCardProps[]
  hasSeverityArr: number[]
  enteredSearchValue: string
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  selectedIncident: IncidentCardProps
  setSelectedIncident: (incident: IncidentCardProps) => void
  dateOrder: 'asc' | 'desc'
  handleDateSort: () => void
  onSeverityClickHandler: (event: React.MouseEvent) => void
  severitySet: Set<SeverityType>
  lastBookElementRef: (node: any) => void
  handleIncidentCardClick: (incident: IncidentCardProps) => () => any
  onAccCloudClick: (event: React.MouseEvent) => any
  accCloud: string
}

const IncidentList: React.FC<IncidentListProps> = ({
  incidentList = [],
  hasSeverityArr = [],
  selectedIncident,
  handleSearch,
  enteredSearchValue,
  handleDateSort,
  dateOrder,
  onSeverityClickHandler,
  severitySet,
  lastBookElementRef,
  handleIncidentCardClick,
  onAccCloudClick,
  accCloud,
}) => {
  console.log('render IncidentList')

  const [modalActive, setModalActive] = useState<boolean>(false)

  const buttons = [
    {
      title: 'Yes',
      handler: () => {},
    },
    {
      title: 'No',
      handler: () => {},
    },
  ]

  return (
    <div className={styles.incident_list}>
      <ModalPopUp
        modalActive={modalActive}
        setModalActive={setModalActive}
        titleOne={'Exceptions'}
        titleTwo={'Do you want to see all the exceptions?'}
        buttons={buttons}
      />
      <div className={styles.filters_panel}>
        <InputSearch onChange={handleSearch} value={enteredSearchValue} />
        <DropDownMenu handleDateSort={handleDateSort} dateOrder={dateOrder} onAccCloudClick={onAccCloudClick} accCloud={accCloud} />
      </div>
      <SeverityFilter handler={onSeverityClickHandler} hasSeverityArr={hasSeverityArr} severitySet={severitySet} />

      <input type='button' onClick={() => setModalActive(true)} />

      <ScrollBar>
        {incidentList.length ? (
          incidentList.map((item, i) => {
            const isLastElement = incidentList.length === i + 1
            return isLastElement ? (
              <div key={item.id} ref={lastBookElementRef}>
                <IncidentCard {...item} onClick={handleIncidentCardClick(item)} isActive={item?.id === selectedIncident?.id} />
              </div>
            ) : (
              <div key={item.id}>
                <IncidentCard {...item} onClick={handleIncidentCardClick(item)} isActive={item?.id === selectedIncident?.id} />
              </div>
            )
          })
        ) : (
          <div className={styles.empty_list}>
            <span>Incident history is empty</span>
          </div>
        )}
      </ScrollBar>
    </div>
  )
}

export default IncidentList
