import { Link } from '@material-ui/core'
import React from 'react'
import { IncidentCardTypes } from './IncidentCard'

const ErrorFix: React.FC<IncidentCardTypes> = ({ VulnerabilityDoc }) => {
  return (
    <>
      <Link href={VulnerabilityDoc} target='_blank' rel='noopener noreferrer'>
        {VulnerabilityDoc}
      </Link>
    </>
  )
}

export default ErrorFix
