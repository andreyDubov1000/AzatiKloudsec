import React, { useState } from 'react'
import ErrorDetails from './ErrorDetails'
import ErrorFix from './ErrorFix'
import { IncidentCardTypes, severityIcons } from './IncidentCard'
import Tabs from './Tab'
import styles from './Incidents.module.css'
import { ModalPopUp } from '@component/elements'
import { useHistory } from 'react-router-dom'

export interface IncidentDetailsProps {
  selectedIncident: IncidentCardTypes | null
  setIncidentList?: React.Dispatch<IncidentCardTypes[]>
}

const IncidentDetails: React.FC<IncidentDetailsProps> = ({ selectedIncident, setIncidentList }) => {
  const [modalActive, setModalActive] = useState<boolean>(false)
  const history = useHistory()
  const ModalPopUpbuttons = [
    {
      title: 'Yes',
      handler: () => {
        history.push('/security-exceptions')
      },
    },
    {
      title: 'No',
      handler: () => {
        setModalActive(false)
      },
    },
  ]
  return (
    <div className={styles.incident_details}>
      <ModalPopUp
        modalActive={modalActive}
        setModalActive={setModalActive}
        titleOne={'Exceptions'}
        titleTwo={'Do you want to see all the exceptions?'}
        buttons={ModalPopUpbuttons}
      />
      {selectedIncident ? (
        <>
          <h2>{selectedIncident?.VulnerabilityDescription} </h2>
          <div className={styles.Details_title}>
            <img src={severityIcons[selectedIncident.Severity]} alt={'Severity icon'} />
            <span> {`${selectedIncident.Severity[0].toUpperCase()}${selectedIncident.Severity.slice(1).toLowerCase()}`}</span>
            <div className={styles.devider}></div>
            <span>Error code:</span>
            <span className={styles.vulnerabilityId}>{selectedIncident.VulnerabilityId}</span>
          </div>
          <Tabs
            first={<ErrorDetails {...selectedIncident} setIncidentList={setIncidentList} setModalActive={setModalActive} />}
            second={<ErrorFix {...selectedIncident} />}
          />
        </>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default IncidentDetails
