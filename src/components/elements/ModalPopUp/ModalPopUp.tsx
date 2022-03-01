import React, { useEffect, useRef } from 'react'
import styles from './ModalPopUp.module.scss'
import { ReactComponent as Cross } from 'assets/icons/times-square-Regular.svg'
import { trapFocusTab } from './trapFocusTab'
import ButtonPopUp from './ButtonPopUp'

type PopUpButtonsType = {
  title: string
  handler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

interface modalPopUpProps {
  modalActive: boolean
  setModalActive: React.Dispatch<boolean>
  titleOne?: string
  titleTwo?: string
  buttons?: PopUpButtonsType[]
  handlerReset?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children?: React.ReactNode
}

const ModalPopUp = ({ modalActive, handlerReset, buttons, setModalActive, children, ...props }: modalPopUpProps) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const elem = ref.current

    if (elem) {
      const onTabDown = trapFocusTab(elem, setModalActive)
      const onLayoutClick = (event: MouseEvent) => {
        if (event.target === event.currentTarget) setModalActive(false)
      }
      elem.classList.add(`${styles.active}`)
      elem.parentElement?.addEventListener('click', onLayoutClick)
      elem.addEventListener('keydown', onTabDown)

      return () => {
        elem.removeEventListener('keydown', onTabDown)
        elem.parentElement?.removeEventListener('click', onLayoutClick)
      }
    }
  }, [modalActive, setModalActive])

  return (
    <>
      {modalActive ? (
        <div className={styles.modal_overlay}>
          <div ref={ref} className={styles.content}>
            <button type={'button'} className={styles.exit_cross} onClick={handlerReset || (() => setModalActive(false))}>
              <Cross />
            </button>
            <h4>{props.titleOne}</h4>
            <span>{props.titleTwo}</span>
            {children}
            <div className={styles.buttons_container}>
              {buttons && buttons.length
                ? buttons.map((item, i, array) => {
                    if (i === array.length - 1) {
                      return <ButtonPopUp key={i} onClick={item.handler} title={item.title} autoFocus={true} />
                    }
                    return <ButtonPopUp key={i} onClick={item.handler} title={item.title} />
                  })
                : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ModalPopUp
