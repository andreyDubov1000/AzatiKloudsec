import styles from './Incidents.module.css'
import React from 'react'
import ScrollBar from 'react-perfect-scrollbar'
import IncidentCard, { IncidentCardTypes } from './IncidentCard'
import DropDownMenu from './DropDownMenu'
import { InputSearch } from '../elements/index'
import SeverityFilter from './SeverityFilter'
import { SeverityType } from '@data/types'

export interface IncidentListProps {
  incidentList: IncidentCardTypes[]
  hasSeverityArr: number[]
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  selectedIncident: IncidentCardTypes | null
  setSelectedIncident: (incident: IncidentCardTypes) => void
  dateOrder: 'asc' | 'desc'
  handleDateSort: () => void
  onSeverityClickHandler: (event: React.MouseEvent) => void
  severitySet: Set<SeverityType>
  lastBookElementRef: (node: any) => void
  onIncidentCardClickHandler: (incident: IncidentCardTypes) => () => any
  onAccCloudClick: (event: React.MouseEvent) => any
  accCloud: string
}

const IncidentList: React.FC<IncidentListProps> = ({
  incidentList = [],
  hasSeverityArr = [],
  selectedIncident,
  handleSearch,
  handleDateSort,
  dateOrder,
  onSeverityClickHandler,
  severitySet,
  lastBookElementRef,
  onIncidentCardClickHandler,
  onAccCloudClick,
  accCloud,
}) => {
  console.log('render IncidentList')

  return (
    <div className={styles.incident_list}>
      <div className={styles.filters_panel}>
        <InputSearch onChange={handleSearch} />
        <DropDownMenu handleDateSort={handleDateSort} dateOrder={dateOrder} onAccCloudClick={onAccCloudClick} accCloud={accCloud} />
      </div>
      <SeverityFilter handler={onSeverityClickHandler} hasSeverityArr={hasSeverityArr} severitySet={severitySet} />

      <ScrollBar>
        {incidentList.length ? (
          incidentList.map((item, i) => {
            const isLastElement = incidentList.length === i + 1
            return isLastElement ? (
              <div key={item.id} ref={lastBookElementRef}>
                <IncidentCard {...item} onClick={onIncidentCardClickHandler(item)} isActive={item?.id === selectedIncident?.id} />
              </div>
            ) : (
              <div key={item.id}>
                <IncidentCard {...item} onClick={onIncidentCardClickHandler(item)} isActive={item?.id === selectedIncident?.id} />
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
