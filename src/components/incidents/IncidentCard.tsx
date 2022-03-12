import CustomBox from '@component/atoms/CustomBox'
import CustomFlexBox from '@component/atoms/CustomFlexBox'
import { Small, Span } from '@component/atoms/Typography'
import { vulnerabilityColor } from '@data/constants'
import { SeverityType } from '@data/types'
import { Card } from '@material-ui/core'
import { RadioButtonChecked } from '@material-ui/icons'
import { SxProps } from '@material-ui/system'

import { format } from 'date-fns'
import React from 'react'

export interface IncidentCardProps {
  sx?: SxProps
  id?: string
  AccountId: string
  Category: string
  CloudService: string
  HasMfa: boolean
  IamUser: string
  Region: string
  Severity: SeverityType
  VulnerabilityDate: string
  VulnerabilityDescription: string
  VulnerabilityDoc: string
  VulnerabilityId: string
  SecurityGroupId: string
  IsSilentVulnerability?: string
  onClick?: (incident: any) => void
}

const IncidentCard: React.FC<IncidentCardProps> = ({
  sx = {},
  VulnerabilityDescription,
  VulnerabilityDate,
  Severity,
  VulnerabilityId,
  onClick,
}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        p: '1rem',
        mb: '1px',
        bgcolor: 'primary.contrastText',
        cursor: 'pointer',
        borderLeft: '3px solid transparent',
        ...sx,
      }}
      onClick={onClick}
    >
      <CustomBox sx={{ mr: '1.5rem', flex: '1 1 0' }}>
        <Span display='block' mb='0.25rem'>
          {VulnerabilityDescription}
        </Span>
        <Span color='grey.600'>{VulnerabilityId}</Span>
      </CustomBox>

      <CustomFlexBox
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          width: 60,
        }}
      >
        {!!VulnerabilityDate && (
          <Small display='block' color='grey.600' mb='0.5rem'>
            {format(new Date(VulnerabilityDate), 'dd MMM, yy hh:mm a')}
          </Small>
        )}
        <RadioButtonChecked fontSize='small' sx={{ color: vulnerabilityColor[Severity]?.bgColor }} />
      </CustomFlexBox>
    </Card>
  )
}

export default IncidentCard
