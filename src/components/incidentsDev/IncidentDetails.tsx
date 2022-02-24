import React, { useState, useCallback } from 'react'
import ErrorDetails from './ErrorDetails'
import ErrorFix from './ErrorFix'
import { IncidentCardTypes } from './IncidentCard'
import Tabs from './Tab'
import styles from './Incidents.module.css'
import { ModalPopUp } from '@component/elements'
import { useHistory } from 'react-router-dom'
import { severityIcons } from '@data/constants'
import { useAppSelector } from '@redux/hooks'
import NotificationManager from '@component/atoms/NotificationManager'
import { useCreateSecurityException, useDeleteSecurityException } from 'services/securityExceptionService'

export interface IncidentDetailsProps {
  selectedIncident: IncidentCardTypes | null
  setIncidentList?: any
  isExceptionPage: boolean
}

const IncidentDetails: React.FC<IncidentDetailsProps> = ({ selectedIncident, setIncidentList, isExceptionPage }) => {
  const [modalActive, setModalActive] = useState<boolean>(false)
  const [exceptionCreateRef, createSecurityException] = useCreateSecurityException()
  const [exceptionDeleteRef, deleteSecurityException] = useDeleteSecurityException()
  const [comment, setComment] = useState('')
  const [isLoading, setLoading] = useState(false)

  const history = useHistory()
  const { user } = useAppSelector((state) => state.auth)

  const deleteItemFromList = useCallback(() => {
    if (setIncidentList && selectedIncident) {
      setIncidentList((list: IncidentCardTypes[]) => list.filter((item) => item.id !== selectedIncident.id))
    }
  }, [selectedIncident, setIncidentList])

  const onMarckAsExceptionClickhandler = useCallback(async () => {
    setLoading(true)
    if (user && selectedIncident) {
      const data = await createSecurityException(user.user_id, selectedIncident.AccountId, {
        resource_vulnerability_id: selectedIncident.ResourceVulnerabilityId,
        cloud_service: selectedIncident.CloudService,
        security_exception_comment: comment,
        security_exception_author: `${user?.given_name} ${user?.family_name}`,
      })
      if (data) {
        setLoading(false)
        deleteItemFromList()
        NotificationManager.success('Exception created successfully.')
        setModalActive(true)
      } else {
        NotificationManager.error("Couldn't create exception.")
      }
    }
    setLoading(false)
  }, [deleteItemFromList, createSecurityException, user, comment, selectedIncident])

  const handleDeleteException = useCallback(async () => {
    setLoading(true)
    if (user && selectedIncident) {
      try {
        await deleteSecurityException(user.user_id, selectedIncident.AwsAccount, selectedIncident.ResourceVulnerabilityId)
        deleteItemFromList()
        NotificationManager.success('Exception deleted successfully.')
      } catch (error) {
        NotificationManager.error("Couldn't delete exception.")
      }
    }
    setModalActive(false)
    setLoading(false)
  }, [user, selectedIncident, deleteItemFromList, deleteSecurityException])

  const handleCommentChange = useCallback(async ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(target.value)
  }, [])

  const IncidentsModalPopUpbuttons = [
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
  const ExceptionsModalPopUpbuttons = [
    {
      title: 'Yes',
      handler: handleDeleteException,
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
        titleOne={isExceptionPage ? 'Remove from exceptions' : 'Exceptions'}
        titleTwo={isExceptionPage ? 'You want to remove this incident from exceptions?' : 'Do you want to see all the exceptions?'}
        buttons={isExceptionPage ? ExceptionsModalPopUpbuttons : IncidentsModalPopUpbuttons}
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
            first={
              <ErrorDetails
                {...selectedIncident}
                comment={comment}
                onMarckAsExceptionClickhandler={onMarckAsExceptionClickhandler}
                isExceptionPage={isExceptionPage}
                exceptionCreateRef={exceptionCreateRef}
                exceptionDeleteRef={exceptionDeleteRef}
                isLoading={isLoading}
                setComment={setComment}
                setModalActive={setModalActive}
                handleDeleteException={handleDeleteException}
                handleCommentChange={handleCommentChange}
              />
            }
            second={<ErrorFix {...selectedIncident} />}
          />
        </>
      ) : (
        <div className={styles.empty_list}>
          <span>No account has been integrated.</span>
          <span>Click here to add your first account.</span>
          <div></div>
        </div>
      )}
    </div>
  )
}

export default IncidentDetails
