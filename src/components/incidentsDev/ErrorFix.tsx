import { Link } from '@material-ui/core'
import React from 'react'
import { IncidentCardProps } from './IncidentCard'

const ErrorFix: React.FC<IncidentCardProps> = ({ VulnerabilityDoc }) => {
  return (
    <>
      <Link href={VulnerabilityDoc} target='_blank' rel='noopener noreferrer'>
        {VulnerabilityDoc}
      </Link>
    </>
  )
}

export default ErrorFix
