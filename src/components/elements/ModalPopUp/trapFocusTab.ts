import React from 'react'

type HTMLTabElement = HTMLButtonElement | HTMLInputElement | HTMLAnchorElement | HTMLAreaElement

export const trapFocusTab = (elem: HTMLDivElement, setModalActive: React.Dispatch<boolean>) => {
  const focusableEls: NodeListOf<HTMLTabElement> = elem.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
  )
  const firstFocusableEl = focusableEls[0]
  const lastFocusableEl = focusableEls[focusableEls.length - 1]

  const onKeyDown = (event: KeyboardEvent) => {
    const isTabPressed = event.key === 'Tab'
    const isEscapePressed = event.key === 'Escape'

    if (isEscapePressed) {
      setModalActive(false)
      return
    }
    if (!isTabPressed) {
      return
    }

    if (event.shiftKey) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus()
        event.preventDefault()
      }
    } else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus()
        event.preventDefault()
      }
    }
  }
  return onKeyDown
}
