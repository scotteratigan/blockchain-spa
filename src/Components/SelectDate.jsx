/* eslint-disable react-hooks/exhaustive-deps */

/*
  A re-usable date-picking component.
  Requires defaultDate (Date format) and dateSetter passed in as props.
  Calls the parent component's dateSetter when input is changed.
*/

// Libraries:
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function SelectDate(props) {
  const { dateSetter, defaultDate } = props;
  const [date, setDate] = useState(defaultDate);

  useEffect(() => {
    dateSetter(moment(date).format("YYYY-MM-DD"));
  }, [date]);

  return (
    <DatePicker
      selected={date}
      onChange={val => {
        setDate(val);
      }}
    />
  );
}
