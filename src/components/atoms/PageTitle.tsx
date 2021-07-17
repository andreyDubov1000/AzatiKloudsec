import React, { Fragment, useEffect } from "react";

export interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, children }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return <Fragment>{children}</Fragment>;
};

export default PageTitle;
