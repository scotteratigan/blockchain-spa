import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import moment from "moment";
import { useDataRange } from "../Hooks/useRates";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

function HistoryChart() {
  const [data, setData] = useState({});
  const [arrData, setArrData] = useState([]);
  const resData = useDataRange("startDate", "endDate");
  console.log("resData:", resData);

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
    <LineChart width={500} height={300} data={arrData}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="BTC" stroke="#8884d8" />
      <Line type="monotone" dataKey="ETH" stroke="#82ca9d" />
    </LineChart>
  );
}

export default HistoryChart;
