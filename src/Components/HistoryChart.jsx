import React, { useState, useEffect } from "react";
import { useDataRange } from "../Hooks/useRates";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import SelectDate from "./SelectDate";

// todo: use my custom size hook to make the chart size responsive

// default display range is 1 month:
let defaultStartDate = new Date();
defaultStartDate.setMonth(defaultStartDate.getMonth() - 1);

const defaultCoinsToChart = {
  BTC: false,
  ETH: true,
  XRP: false,
  EOS: true,
  LTC: true,
  BCH: false,
  BNB: false
};

const defaultChartColors = {
  BTC: "red",
  ETH: "orange",
  XRP: "yellow",
  EOS: "green",
  LTC: "blue",
  BCH: "purple",
  BNB: "black"
};

function HistoryChart() {
  const [data, setData] = useState({});
  const [arrData, setArrData] = useState([]);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(new Date());
  const resData = useDataRange(startDate, endDate);
  const [coinsToChart, setCoinsToChart] = useState(defaultCoinsToChart);

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

  const chartLines = Object.keys(coinsToChart)
    .filter(key => coinsToChart[key])
    .map(key => (
      <Line
        type="monotone"
        dataKey={key}
        stroke={defaultChartColors[key]}
        key={key}
      />
    ));

  return (
    <>
      Start Date:
      <SelectDate dateSetter={setStartDate} defaultDate={startDate} />
      End Date:
      <SelectDate dateSetter={setEndDate} defaultDate={endDate} />
      <div style={{ display: "flex" }}>
        <LineChart width={500} height={400} data={arrData}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          {chartLines}
        </LineChart>
        <SelectCoins coinList={coinsToChart} setCoinList={setCoinsToChart} />
      </div>
    </>
  );
}

function SelectCoins(props) {
  const { coinList, setCoinList } = props;
  const selectionJSX = Object.keys(coinList).map(key => (
    <li key={key} className="list-group-item">
      <label className="px-2">{key}</label>
      <input
        type="checkbox"
        defaultChecked={coinList[key]}
        onChange={e => setCoinList({ ...coinList, [key]: !coinList[key] })}
      />
    </li>
  ));
  return (
    <div style={{ width: 125 }}>
      <form>
        <ul className="list-group">{selectionJSX}</ul>
      </form>
    </div>
  );
}

export default HistoryChart;
