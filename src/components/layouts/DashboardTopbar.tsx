import CustomBox from '@component/atoms/CustomBox'
import Sidenav from '@component/atoms/Sidenav'
import { AppBar, Badge, IconButton } from '@material-ui/core'
import Menu from '@material-ui/icons/Menu'
import Notifications from '@material-ui/icons/Notifications'
import Person from '@material-ui/icons/Person'
import React from 'react'
import DashboardSidenav from '../sidenav/SidenavMenuPanel'

const DashboardTopbar = () => {
  return (
    <AppBar
      sx={{
        position: 'relative',
        bgcolor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        px: '1rem',
        height: { xs: 56, md: 64 },
      }}
      elevation={2}
    >
      <Sidenav
        handle={
          <IconButton sx={{ display: { md: 'none' } }}>
            <Menu />
          </IconButton>
        }
      >
        <DashboardSidenav />
      </Sidenav>

      <CustomBox
        sx={{
          display: 'flex',
          flex: '1 1 0',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton sx={{ mr: '0.5rem' }}>
          <Badge color='secondary' badgeContent='5'>
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton>
          <Person />
        </IconButton>
      </CustomBox>
    </AppBar>
  )
}

export default DashboardTopbar
