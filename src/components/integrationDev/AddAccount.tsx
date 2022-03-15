import CustomBox from '@component/atoms/CustomBox'
import CustomImage from '@component/atoms/CustomImage'
import Sidenav from '@component/atoms/Sidenav'
import { H6, Paragraph, Span } from '@component/atoms/Typography'
import { Button, IconButton } from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import React, { useState } from 'react'
import styles from './AddAccount.module.scss'

export interface AddAccountProps {
  user_id: string | undefined
}

const AddAccount: React.FC<AddAccountProps> = ({ user_id }) => {
  const [sidenavOpen, setSidenavOpen] = useState(false)

  const toggleSidenav = async () => {
    setSidenavOpen(!sidenavOpen)
  }

  return (
    <Sidenav
      open={sidenavOpen}
      position='right'
      width='40%'
      toggleSidenav={toggleSidenav}
      handle={<div className={styles.handle}>+Add new account</div>}
    >
      <CustomBox
        sx={{
          p: '2rem 1rem',
          maxWidth: 400,
          mx: 'auto',
          textAlign: 'center',
        }}
      >
        <IconButton onClick={toggleSidenav} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Close fontSize='small' />
        </IconButton>
        <H6 fontWeight='700' mt='2rem' mb='1rem'>
          Add an Account
        </H6>
        <Paragraph>To enable visibility in KloudSec, create a limited permission role</Paragraph>

        <CustomImage
          src='/assets/images/icons/aws.svg'
          // width="100%"
          height='200px'
          sx={{ opacity: 0.5, maxWidth: '100%' }}
        />

        <Paragraph textAlign='left' mb='2.5rem'>
          The cloudformation stack will creates an AWS IAM Role named <b>KloudSecRole</b>, The purpose of this role is to allow KloudSec app
          to scan all the account services and fetch potential security vulnerabilities. <br />
          KloudSecRole role uses an <b>ExternalID</b> in order to protect the cross account session. Please do not change this value! <br />
          Your ExternalID is:{' '}
          <Span fontWeight='700' color='error.main'>
            {user_id}
          </Span>
        </Paragraph>

        <a
          href={`https://console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/quickcreate?templateURL=https%3A%2F%2Fs3.eu-west-1.amazonaws.com%2Fkloudsec-public-assets%2FKloudSecCustomerRole.yaml&param_ExternalID=${user_id}&stackName=KloudSecRole`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button variant='contained' color='primary' fullWidth sx={{ borderRadius: '300px' }} onClick={toggleSidenav}>
            LAUNCH STACK
          </Button>
        </a>
      </CustomBox>
    </Sidenav>
  )
}

export default AddAccount
