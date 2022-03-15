import { Drawer } from '@material-ui/core'
import React, { cloneElement, useEffect, useState } from 'react'

export interface SidenavProps {
  position?: 'left' | 'right'
  open?: boolean
  width?: number | string
  handle: React.ReactElement
  toggleSidenav?: () => void
}

const Sidenav: React.FC<SidenavProps> = ({ position = 'left', open = false, width = 280, handle, children, toggleSidenav }) => {
  const [sidenavOpen, setSidenavOpen] = useState(open)

  const handleToggleSidenav = () => {
    setSidenavOpen(!sidenavOpen)
  }

  useEffect(() => {
    setSidenavOpen(open)
  }, [open])

  return (
    <>
      <Drawer
        open={sidenavOpen}
        anchor={position}
        onClose={toggleSidenav || handleToggleSidenav}
        SlideProps={{ style: { width: width }, unmountOnExit: true }}
      >
        {children}
      </Drawer>

      {handle &&
        cloneElement(handle, {
          onClick: toggleSidenav || handleToggleSidenav,
        })}
    </>
  )
}

export default Sidenav
