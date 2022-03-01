import React, { useCallback, useEffect, useState } from 'react'
import { ModalPopUp } from '@component/elements'
import { useHistory, Prompt } from 'react-router-dom'

interface IRouteLeavingGuardProps {
  isBlocked?: boolean
  shouldBlockPath?: (location: any) => boolean
  navigateTo?: (location: any) => any
}

const RouteLeavingGuard: React.FC<IRouteLeavingGuardProps> = ({ isBlocked = true, shouldBlockPath = () => true, navigateTo }) => {
  const history = useHistory()
  type locationType = typeof history.location
  type StateType = {
    modalVisible: boolean
    lastLocation: locationType | null
    blocked: boolean
  }
  const initialState = {
    modalVisible: false,
    lastLocation: history.location,
    blocked: isBlocked,
  }
  const [state, setState] = useState<StateType>(initialState)

  const alertUser = (event: BeforeUnloadEvent) => {
    event.preventDefault()
    event.returnValue = ''
    console.log(event)
  }

  useEffect(() => {
    if (state.blocked) {
      window.addEventListener('beforeunload', alertUser)
    }
    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [state.blocked])

  useEffect(() => {
    setState((state) => ({ ...state, blocked: isBlocked }))
  }, [isBlocked])

  const showModal = (location: locationType) => {
    setState((state) => ({ ...state, modalVisible: true, lastLocation: location }))
  }
  const closeModal = () => {
    setState((state) => ({ ...state, modalVisible: false, lastLocation: history.location }))
  }

  type PromptMessageType = (location: locationType, action?: any) => boolean

  const handleBlockedNavigation: PromptMessageType = (location) => {
    const { blocked } = state
    if (history.location.pathname === location.pathname) return false
    if (blocked && shouldBlockPath(location)) {
      showModal(location)
      return false
    }
    return true
  }

  const handleConfirmNavigation = () => {
    setState((state) => ({ ...state, modalVisible: false, blocked: false }))
  }

  useEffect(() => {
    const { lastLocation } = state
    const currentPath = history.location.pathname
    if (lastLocation && lastLocation.pathname !== currentPath) {
      navigateTo ? navigateTo(lastLocation) : history.push(lastLocation.pathname)
    }
  }, [state.blocked, navigateTo])

  const ModalPopUpButtons = [
    {
      title: 'Yes',
      handler: handleConfirmNavigation,
    },
    {
      title: 'No',
      handler: closeModal,
    },
  ]

  return (
    <>
      <Prompt when={state.blocked} message={handleBlockedNavigation} />
      <ModalPopUp
        modalActive={state.modalVisible}
        setModalActive={closeModal}
        titleOne={'Leave the page?'}
        titleTwo={`Do you want to leave the page?\nAll data entered will not be saved.`}
        buttons={ModalPopUpButtons}
      />
    </>
  )
}

export default RouteLeavingGuard
