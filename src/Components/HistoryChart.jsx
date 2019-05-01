import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import moment from "moment";
import { useDataRange } from "../Hooks/useRates";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import SelectDate from "./SelectDate";

let defaultStartDate = new Date();
console.log("new Date():", defaultStartDate);
defaultStartDate.setMonth(defaultStartDate.getMonth() - 1);
console.log("defaultStartDate: ", defaultStartDate);

function HistoryChart() {
  const [data, setData] = useState({});
  const [arrData, setArrData] = useState([]);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(new Date());
  const resData = useDataRange(startDate, endDate);

  useEffect(() => {
    setData({ ...resData });
  }, [resData]);

  useEffect(() => {
    if (data && data.rates) {
      const dataKeys = Object.keys(data.rates);
      const dataArr = [];
      dataKeys.forEach(key => {
        if (data.rates[key]) {
          dataArr.push(data.rates[key]);
        }
      });
      setArrData(dataArr);
    }
  }, [data]);
  console.log("data:", data);
  console.log("arrData:", arrData);
  return (
    <div>
      Start Date:
      <SelectDate dateSetter={setStartDate} defaultDate={startDate} />
      End Date:
      <SelectDate dateSetter={setEndDate} defaultDate={endDate} />
      <LineChart width={500} height={300} data={arrData}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="BTC" stroke="#8884d8" />
        <Line type="monotone" dataKey="ETH" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}

export default HistoryChart;
