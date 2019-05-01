/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import SortArrow from "./SortArrow";
import Coin from "./Coin";

function RateTable(props) {
  const [currSort, setCurrSort] = useState("");
  const [rateArr, setRateArr] = useState([]);
  const [rates, setRates] = useState(props.data.rates);

  // hook to catch changes in data (used when changing calendar dates):
  useEffect(() => {
    setRates({ ...props.data.rates });
    console.log("setting rates...");
  }, [props.data]);

  // convert data object into array for sorting &rendering:
  useEffect(() => {
    if (rates) {
      const rateKeys = Object.keys(rates);
      const newRateArr = [];
      rateKeys.forEach(key => {
        // each item in the array is in format {name: BTC, value: 5000.2342}
        if (rates[key]) {
          newRateArr.push({ name: key, value: rates[key] });
        }
      });
      setRateArr(newRateArr);
    }
  }, [rates]);

  // Allow users to sort coins by price or name, ascending or descending:
  useEffect(() => {
    switch (currSort) {
      default:
        return;
      case "rate-asc":
        const rateAscArr = [...rateArr].sort((a, b) => a.value - b.value);
        setRateArr(rateAscArr);
        return;
      case "rate-dsc":
        const rateDscArr = [...rateArr].sort((a, b) => b.value - a.value);
        setRateArr(rateDscArr);
        return;
      case "coin-asc":
        const nameAscArr = [...rateArr].sort((a, b) => {
          const textA = a.name.toUpperCase();
          const textB = b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        setRateArr(nameAscArr);
        return;
      case "coin-dsc":
        const nameDscArr = [...rateArr].sort((a, b) => {
          const textA = a.name.toUpperCase();
          const textB = b.name.toUpperCase();
          return textA > textB ? -1 : textA < textB ? 1 : 0;
        });
        setRateArr(nameDscArr);
        return;
    }
  }, [currSort]);

  // If no data display loading message
  if (!props.data || !props.data.success) {
    return <div>Loading data...</div>;
  }

  // Otherwise, render the table of data:
  return (
    <table>
      <thead>
        <tr>
          <th>
            <div style={{ display: "flex" }}>
              Coin <SortArrow setSort={setCurrSort} column={"coin"} />
            </div>
          </th>
          <th>
            <div style={{ display: "flex" }}>
              Rate ($) <SortArrow setSort={setCurrSort} column={"rate"} />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <TableRows rateArr={rateArr} />
      </tbody>
    </table>
  );
}

// map out each coin to it's own table row for insertion above:
function TableRows(props) {
  return props.rateArr.map((coin, i) => {
    const coinStr = coin.value.toFixed(2);
    return (
      <tr key={coin.name}>
        <td>
          <Coin name={coin.name} />
        </td>
        <td style={{ textAlign: "right" }}>{coinStr}</td>
      </tr>
    );
  });
}

export default RateTable;
