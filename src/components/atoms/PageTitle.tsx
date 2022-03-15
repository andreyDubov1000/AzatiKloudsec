import React, { Fragment, useEffect } from 'react'

export interface PageTitleProps {
  title: string
}

const PageTitle: React.FC<PageTitleProps> = ({ title, children }) => {
  useEffect(() => {
    if (title) {
      document.title = `${title[0].toUpperCase}${title.slice(1)}`
    }
  }, [title])

  return <Fragment>{children}</Fragment>
}

export default PageTitle
