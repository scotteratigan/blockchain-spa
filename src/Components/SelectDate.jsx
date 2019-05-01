/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function SelectDate(props) {
  const { dateSetter, defaultDate } = props;
  console.log("defaultDate:", defaultDate);
  console.log("typeof defaultDate", typeof defaultDate);
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
