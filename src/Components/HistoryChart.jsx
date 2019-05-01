// Libraries:
import React, { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
// Hooks:
import { useDataRange } from "../Hooks/useRates";
import useSize from "../Hooks/useSize";
// Components:
import SelectDate from "./SelectDate";
import Coin from "./Coin";

// Set start date. Default graph duration is 1 month.
let defaultStartDate = new Date();
defaultStartDate.setMonth(defaultStartDate.getMonth() - 1);

const defaultCoinsToChart = {
  // Initialize list of coins to graph.
  BTC: false,
  ETH: true,
  XRP: false,
  EOS: true,
  LTC: true,
  BCH: false,
  BNB: false
};

const defaultChartColors = {
  // A unique color for each coin type
  BTC: "red",
  ETH: "orange",
  XRP: "gold",
  EOS: "green",
  LTC: "blue",
  BCH: "magenta",
  BNB: "grey"
};

function HistoryChart() {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState({}); // store chart data from async hook, as object
  const [arrData, setArrData] = useState([]); // same array from prev line as an array
  const resData = useDataRange(startDate, endDate); // hook into async API call
  const [coinsToChart, setCoinsToChart] = useState(defaultCoinsToChart); // set up list of coins to graph
  const screen = useSize(); // hook to make chart size responsive

  useEffect(() => {
    // update data in state when receiving new response from API
    setData({ ...resData });
  }, [resData]);

  useEffect(() => {
    // when new data arrives, convert it to an array, in format parsable by rechart
    if (data && data.rates) {
      const dataArr = Object.keys(data.rates).map(key => ({
        name: key,
        ...data.rates[key]
      }));
      setArrData(dataArr);
    }
  }, [data]);

  return (
    <div style={{ margin: "0 auto" }}>
      <h5>Dynamic Historical Graph</h5>
      <label style={{ margin: 10 }}>Start Date:</label>
      <SelectDate dateSetter={setStartDate} defaultDate={startDate} />
      <label style={{ margin: 10 }}>End Date:</label>
      <SelectDate dateSetter={setEndDate} defaultDate={endDate} />

      <div style={{ display: "flex", justifyContent: "center", marginTop: 25 }}>
        <LineChart
          width={Math.max(screen.width - 650, 300)}
          height={400}
          data={arrData}
        >
          <XAxis dataKey="name" />
          <YAxis
            label={{ value: "$ per coin", angle: -90, position: "insideLeft" }}
          />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          {/* Conditionally render individual lines on chart, based on check boxes: */}
          {Object.keys(coinsToChart)
            .filter(key => coinsToChart[key])
            .map(key => (
              <Line
                type="monotone"
                dataKey={key}
                stroke={defaultChartColors[key]}
                key={key}
              />
            ))}
        </LineChart>
        <SelectCoins coinList={coinsToChart} setCoinList={setCoinsToChart} />
      </div>
    </div>
  );
}

// Coin selection component was complicated enough to warrant separating from graph
// But since it's very tightly coupled it makes sense to keep it in same file
function SelectCoins(props) {
  const { coinList, setCoinList } = props;
  const selectionJSX = Object.keys(coinList).map(key => (
    <li key={key} className="list-group-item">
      <label className="px-2">
        <Coin name={key} />
      </label>
      <input
        type="checkbox"
        defaultChecked={coinList[key]}
        onChange={e => setCoinList({ ...coinList, [key]: !coinList[key] })}
      />
      <hr
        style={{
          borderColor: `${defaultChartColors[key]}`,
          borderWidth: "2px",
          padding: 0,
          margin: 0
        }}
      />
    </li>
  ));
  return (
    <div style={{ width: 125, marginLeft: 15 }}>
      <form>
        <ul className="list-group">{selectionJSX}</ul>
      </form>
    </div>
  );
}

export default HistoryChart;
