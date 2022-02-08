import CustomBox from '@component/atoms/CustomBox'
import CustomImage from '@component/atoms/CustomImage'
import protectedLayoutSidenavNavigations from '@data/protectedLayoutSidenavNavigations'
import { MenuItem, Tooltip } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { Logout } from '@material-ui/icons'
import { SIGN_OUT } from '@redux/auth/authTypes'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import React from 'react'
import ScrollBar from 'react-perfect-scrollbar'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { signOut } from 'services/authService'

const SidenavMenuItem = styled(MenuItem)({
  justifyContent: 'center',
  borderRadius: '4px',
  height: 44,
  width: 44,
  fontSize: '1.75rem',
  marginBottom: '0.25rem',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.16)',
  },
})

const ProtectedLayoutSidenav = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { token } = useAppSelector((state) => state.auth)

  const handleSignOut = async () => {
    const data = await signOut({
      email: token?.email,
      access_token: token?.access_token,
    })

    if (data) {
      dispatch({ type: SIGN_OUT })
      history.push('/signin')
    }
  }

  return (
    <CustomBox
      sx={{
        '& .scroll-bar': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
          bgcolor: 'primary.main',
          height: '100vh',
          width: 64,
          minWidth: 64,
          py: '1rem',
        },
        '& .active': {
          '& > *': {
            bgcolor: 'rgba(255, 255, 255, 0.16)',
          },
        },
      }}
    >
      <ScrollBar className='scroll-bar'>
        <Link to='/dashboard/risk-management'>
          <CustomImage src='/logo-white.svg' alt='logo' width='100%' sx={{ display: 'block', mx: 'auto', mb: '2rem', px: '1rem' }} />
        </Link>

        {protectedLayoutSidenavNavigations.map((item) => (
          <NavLink activeClassName='active' to={item.path} key={item.path}>
            <Tooltip title={item.title} placement='right'>
              <SidenavMenuItem>
                <item.icon fontSize='inherit' />
              </SidenavMenuItem>
            </Tooltip>
          </NavLink>
        ))}

        <Tooltip title='Logout' placement='right'>
          <SidenavMenuItem onClick={handleSignOut}>
            <Logout fontSize='inherit' />
          </SidenavMenuItem>
        </Tooltip>
      </ScrollBar>
    </CustomBox>
  )
}

export default ProtectedLayoutSidenav
