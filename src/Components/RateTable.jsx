/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import SortArrow from "./SortArrow";
import Coin from "./Coin";

function RateTable(props) {
  const [currSort, setCurrSort] = useState("");
  const [rateArr, setRateArr] = useState([]);
  const [rates, setRates] = useState(props.data.rates);

  // convert object to array of JSX:
  // const { rates } = props.data;

  useEffect(() => {
    setRates({ ...props.data.rates });
    console.log("setting rates...");
  }, [props.data]);

  useEffect(() => {
    if (rates) {
      console.log("rates received, rendering. rates:", rates);
      const rateKeys = Object.keys(rates);
      // convert object to array to allow sorting:
      let newRateArr = [];
      rateKeys.forEach(key => {
        if (rates[key]) {
          newRateArr.push({ name: key, value: rates[key] });
        }
      });
      setRateArr(newRateArr);
    }
  }, [rates]);

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

  if (!props.data || !props.data.success) {
    return <div>Loading data...</div>;
  }

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

function TableRows(props) {
  return props.rateArr.map((coin, i) => {
    return (
      <tr key={coin.name}>
        <td>
          <Coin name={coin.name} />
        </td>
        <td>{coin.value}</td>
      </tr>
    );
  });
}

export default RateTable;
