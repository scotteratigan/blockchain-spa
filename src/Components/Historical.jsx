/* eslint-disable react-hooks/exhaustive-deps */
// Libraries:
import React, { useState, useEffect } from "react";
import moment from "moment";
// Components:
import RateTable from "./RateTable";
import SelectDate from "./SelectDate";
// Hooks:
import { useHistoricalRate } from "../Hooks/useRates";

function Historical() {
  const [date, setDate] = useState(new Date()); // store selected date from SelectDate
  const [data, setData] = useState({}); // store data from async hook in state
  const resData = useHistoricalRate(moment(date).format("YYYY-MM-DD")); // format date to text to submit to external API

  useEffect(() => {
    // update state when new data arrives
    setData({ ...resData });
  }, [resData]);

  return (
    <div style={{ margin: "0 auto" }}>
      <h5>Historical Cost per Coin, $</h5>
      Select a date:
      <SelectDate dateSetter={setDate} defaultDate={date} />
      <div style={{ height: 500, overflow: "scroll" }}>
        <RateTable data={data} />
      </div>
    </div>
  );
}

export default Historical;
