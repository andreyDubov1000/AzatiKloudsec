import React, { forwardRef, useState } from 'react';
import styles from './Calendar.module.scss';
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Calendar.scss';
import classNames from "classnames";
import { SvgIcon } from "@material-ui/core";

interface CalendarPropsTypes {
  onChange: (value: Date | null) => any;
}

interface CalendarContainerPropsTypes {
  className: string;
  children: any;
}

interface CustomInputPropsTypes {
  value?: Date | undefined;
  onChange?: (value: Date) => any;
}


const Calendar = ({ onChange }: CalendarPropsTypes) => {
  const [startDate, setStartDate] = useState(new Date());

  const onChangeHandler = (value: Date) => {
    onChange(value);
    setStartDate(value);
  };


  const MyContainer = ({ className, children }: CalendarContainerPropsTypes) => {
    return (
      <div className={classNames('calendar', styles.container)}>
        <CalendarContainer className={classNames(styles.calendarContainer, className)}>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  const ExampleCustomInput = forwardRef(({ value, onChange, onClick }: any, ref: any) => (
    <div className={styles.calendarInputContainer}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#0F2978" className={styles.calendarIcon}>
        <path d="M15 1.25H14.75V1C14.75 0.586 14.414 0.25 14 0.25C13.586 0.25 13.25 0.586 13.25 1V1.25H6.75V1C6.75 0.586 6.414 0.25 6 0.25C5.586 0.25 5.25 0.586 5.25 1V1.25H5C2.381 1.25 0.25 3.381 0.25 6V15C0.25 17.619 2.381 19.75 5 19.75H15C17.619 19.75 19.75 17.619 19.75 15V6C19.75 3.381 17.619 1.25 15 1.25ZM5 2.75H5.25V4C5.25 4.414 5.586 4.75 6 4.75C6.414 4.75 6.75 4.414 6.75 4V2.75H13.25V4C13.25 4.414 13.586 4.75 14 4.75C14.414 4.75 14.75 4.414 14.75 4V2.75H15C16.792 2.75 18.25 4.208 18.25 6V6.25H1.75V6C1.75 4.208 3.208 2.75 5 2.75ZM15 18.25H5C3.208 18.25 1.75 16.792 1.75 15V7.75H18.25V15C18.25 16.792 16.792 18.25 15 18.25ZM15 11C15 11.552 14.552 12 14 12C13.448 12 13 11.552 13 11C13 10.448 13.448 10 14 10C14.552 10 15 10.448 15 11ZM11 11C11 11.552 10.552 12 10 12C9.448 12 9 11.552 9 11C9 10.448 9.448 10 10 10C10.552 10 11 10.448 11 11ZM7 11C7 11.552 6.552 12 6 12C5.448 12 5 11.552 5 11C5 10.448 5.448 10 6 10C6.552 10 7 10.448 7 11ZM15 15C15 15.552 14.552 16 14 16C13.448 16 13 15.552 13 15C13 14.448 13.448 14 14 14C14.552 14 15 14.448 15 15ZM11 15C11 15.552 10.552 16 10 16C9.448 16 9 15.552 9 15C9 14.448 9.448 14 10 14C10.552 14 11 14.448 11 15ZM7 15C7 15.552 6.552 16 6 16C5.448 16 5 15.552 5 15C5 14.448 5.448 14 6 14C6.552 14 7 14.448 7 15Z" />
      </svg>
      <input className={styles.customInput} value={value} onClick={onClick} onChange={onChange} ref={ref} />
    </div>
  ));


  return (
    <DatePicker selected={startDate} onChange={onChangeHandler} calendarContainer={MyContainer}
                customInput={<ExampleCustomInput />} />
  );
};

export default Calendar;


