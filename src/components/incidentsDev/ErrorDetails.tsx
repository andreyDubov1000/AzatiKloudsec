import React, { useEffect } from 'react'
import ScrollBar from 'react-perfect-scrollbar'
import { IncidentCardTypes } from './IncidentCard'
import styles from './ErrorDetails.module.scss'
import { ButtonSimple } from '@component/elements'
import { CancelTokenSource } from 'axios'

type ErrorDetailsProps = {
  onMarckAsExceptionClickhandler: () => void
  currentPage: 'security-exceptions' | 'incidents' | 'scans'
  exceptionCreateRef: React.MutableRefObject<CancelTokenSource | null>
  exceptionDeleteRef: React.MutableRefObject<CancelTokenSource | null>
  handleDeleteException: () => void
  isLoading: boolean
  setComment: React.Dispatch<string>
  setModalActive: React.Dispatch<boolean>
  comment: string
  handleCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => any
}

const ErrorDetails: React.FC<IncidentCardTypes & ErrorDetailsProps> = ({
  SecurityExceptionComment,
  currentPage,
  isLoading,
  setComment,
  setModalActive,
  comment,
  exceptionCreateRef,
  exceptionDeleteRef,
  onMarckAsExceptionClickhandler,
  VulnerabilityDoc,
  handleDeleteException,
  handleCommentChange,
  ...props
}: any) => {
  const regExp = /[A-Z]/g

  useEffect(() => {
    setComment('')
  }, [props.ResourceVulnerabilityId, setComment])

  useEffect(
    () => () => {
      if (exceptionCreateRef.current) exceptionCreateRef.current.cancel('Incidents cancel create Exception')
      if (exceptionDeleteRef.current) exceptionDeleteRef.current.cancel('Incidents cancel delete Exception')
    },
    [exceptionCreateRef, exceptionDeleteRef]
  )

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
      {currentPage === 'security-exceptions' ? (
        <div className={styles.exception_button}>
          <ButtonSimple disabled={isLoading} onClick={() => setModalActive(true)}>
            Delete Exception
          </ButtonSimple>
        </div>
      ) : null}
      {currentPage === 'incidents' ? (
        <>
          <div className={styles.textarea_container}>
            <textarea id={'comment'} className={styles.textarea_bar} wrap='soft' value={comment} required onChange={handleCommentChange} />
            <label htmlFor={'comment'} className={styles.textarea_label}>
              Exception comment
            </label>
          </div>
          <div className={styles.exception_button}>
            <ButtonSimple disabled={!comment || isLoading} onClick={onMarckAsExceptionClickhandler}>
              Mark as Exception
            </ButtonSimple>
          </div>
        </>
      ) : null}
    </>
  )
}

export default ErrorDetails
