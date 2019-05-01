/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import RateTable from "./RateTable";
import { useHistoricalRate } from "../Hooks/useRates";

function Historical() {
  const [date, setDate] = useState(new Date());
  const [fmtDate, setFmtDate] = useState(); // todo: remove this by moving into handleDateChange
  const [data, setData] = useState({});

  useEffect(() => {
    setFmtDate(moment(date).format("YYYY-MM-DD"));
  }, [date]);

  const resData = useHistoricalRate(fmtDate);
  useEffect(() => {
    setData({ ...resData });
  }, [resData]);
  console.log("data:", data);
  return (
    <div>
      <h5>Historical Price Lookup...</h5>
      Select a date:
      <DatePicker
        selected={date}
        onChange={val => {
          setDate(val);
        }}
      />
      <RateTable data={data} />
    </div>
  );
}

export default Historical;
