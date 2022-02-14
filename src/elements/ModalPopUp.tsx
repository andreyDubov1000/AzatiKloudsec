import React, { useEffect, useRef } from 'react'
import styles from './ModalPopUp.module.css'
import { ReactComponent as Cross } from 'assets/icons/times-square-Regular.svg'
import ButtonSimple from './ButtonSimple'
import { trapFocusTab } from './trapFocusTab'

type PopUpButtonsType = {
  title: string
  handler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

interface modalPopUPProps {
  modalActive: boolean
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>
  titleOne?: string
  titleTwo?: string
  buttons?: PopUpButtonsType[]
  handlerReset?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const ModalPopUP: React.FC<modalPopUPProps> = ({ modalActive, handlerReset, buttons, setModalActive, children, ...props }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const elem = ref.current

    if (elem) {
      const onTabDown = trapFocusTab(elem)
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
                      return <ButtonSimple key={i} onClick={item.handler} title={item.title} autoFocus={true} />
                    }
                    return <ButtonSimple key={i} onClick={item.handler} title={item.title} />
                  })
                : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ModalPopUP
