import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import RateTable from "./RateTable";
import { useHistoricalRate } from "../Hooks/useRates";

function Historical() {
  const [date, setDate] = useState("");
  const [fmtDate, setFmtDate] = useState("");
  // const data = useHistoricalRate(fmtDate);
  // const [data, setData] = useState({});

  useEffect(() => {
    setFmtDate(moment(date).format("YYYY-MM-DD"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  // useEffect(() => {
  //  call useHistoricalRate?
  // }, [fmtDate]);

  return (
    <div>
      <h5>Historical Price Lookup...</h5>
      Select a date:
      <DatePicker
        // selected={date}
        onChange={val => {
          setDate(val);
        }}
      />
      <RateTable data={useHistoricalRate(fmtDate)} />
    </div>
  );
}

export default Historical;
