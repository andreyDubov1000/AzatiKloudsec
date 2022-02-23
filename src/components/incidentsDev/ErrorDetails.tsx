import NotificationManager from '@component/atoms/NotificationManager'
import { Button } from '@material-ui/core'
import { useAppSelector } from '@redux/hooks'
import React, { ChangeEvent, useEffect, useState } from 'react'
import ScrollBar from 'react-perfect-scrollbar'
import { useLocation } from 'react-router'
import { createSecurityException, deleteSecurityException } from 'services/securityExceptionService'
import { IncidentCardTypes } from './IncidentCard'
import styles from './ErrorDetails.module.scss'
import { ButtonSimple } from '@component/elements'

type ErrorDetailsProps = {
  setIncidentList?: any
  setModalActive: React.Dispatch<boolean>
}

const ErrorDetails: React.FC<IncidentCardTypes & ErrorDetailsProps> = ({
  SecurityExceptionComment,
  setIncidentList,
  setModalActive,
  VulnerabilityDoc,
  ...props
}: any) => {
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const { pathname } = useLocation()
  const { user } = useAppSelector((state) => state.auth)
  const isExceptionPage = pathname.includes('exceptions')

  useEffect(() => {
    setComment('')
  }, [props.ResourceVulnerabilityId])

  const deleteItemFromList = () => {
    if (setIncidentList) {
      setIncidentList((list: IncidentCardTypes[]) => list.filter((item) => item.id !== props.id))
    }
  }

  const onMarckAsExceptionClickhandler = async () => {
    setLoading(true)
    if (user) {
      const data = await createSecurityException(user.user_id, props.AccountId, {
        resource_vulnerability_id: props.ResourceVulnerabilityId,
        cloud_service: props.CloudService,
        security_exception_comment: comment,
        security_exception_author: `${user?.given_name} ${user?.family_name}`,
      })

      if (data) {
        deleteItemFromList()
        NotificationManager.success('Exception created successfully.')
        setModalActive(true)
      } else {
        NotificationManager.error("Couldn't create exception.")
      }
    }
    setLoading(false)
  }

  const handleDeleteException = async () => {
    setLoading(true)
    if (user) {
      try {
        await deleteSecurityException(user.user_id, props.AwsAccount, props.ResourceVulnerabilityId)
        deleteItemFromList()
        NotificationManager.success('Exception deleted successfully.')
      } catch (error) {
        NotificationManager.error("Couldn't delete exception.")
      }
    }
    setLoading(false)
  }

  const handleCommentChange = async ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(target.value)
  }

  console.log(SecurityExceptionComment, props)
  const regExp = /[A-Z]/g

  return (
    <>
      <ScrollBar className={styles.error_details}>
        {Object.keys(props)
          .slice(1)
          .map((key) => (
            <div key={key}>
              <span className={styles.error_name}>{key.replace(regExp, ' $&')}</span>
              <span>:</span>
              <span className={styles.error_value}>{props[key].toString()}</span>
            </div>
          ))}
        {SecurityExceptionComment && (
          <div>
            <span className={styles.error_name}>{'SecurityExceptionComment'}</span>
            <span>:</span>
            <span className={styles.error_value}>{SecurityExceptionComment}</span>
          </div>
        )}
      </ScrollBar>
      {isExceptionPage ? (
        <Button
          color='error'
          variant='contained'
          size='small'
          disableElevation
          sx={{ mt: '1rem', textTransform: 'none' }}
          disabled={loading}
          onClick={handleDeleteException}
        >
          Delete Exception
        </Button>
      ) : (
        <>
          <div className={styles.textarea_container}>
            <textarea className={styles.textarea_bar} wrap='soft' value={comment} required onChange={handleCommentChange} />
            <label className={styles.textarea_label}>Exception comment</label>
          </div>
          <div className={styles.exception_button}>
            <ButtonSimple disabled={!comment || loading} onClick={onMarckAsExceptionClickhandler}>
              Mark as Exception
            </ButtonSimple>
          </div>
        </>
      )}
    </>
  )
}

export default ErrorDetails
