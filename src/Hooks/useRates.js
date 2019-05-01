/*
  Custom hook to allow fetching of API data from CoinLayer
  Key is exposed here, this is only acceptable in quick demo.
*/

import { useEffect, useState } from "react";
const ENCODED_KEY = "M2UzZTE4MWZmYThlZDY5YTRkOGRkZjNlZTI1NzJlZGU=";
const KEY_BUFF = new Buffer(ENCODED_KEY, "base64");
const BASE_URL = "https://api.coinlayer.com/api";
const axios = require("axios");

export function useLiveRates() {
  // "live" endpoint - request the most recent cryptocurrency rates, by coin initials
  // http://api.coinlayer.com/api/live?access_key=KEY&symbols=BTC,ETH
  const [data, setData] = useState({});
  useEffect(() => {
    const reqURL = `${BASE_URL}/live?access_key=${KEY_BUFF.toString("ascii")}`; //&symbols=BTC,ETH
    queryCoinLayerAPI(reqURL, setData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return data;
}

export function useHistoricalRate(date) {
  // "Historical" endpoint - request prices for coins on a given day
  const [data, setData] = useState({});
  useEffect(() => {
    if (date && date !== "Invalid date") {
      const reqURL = `${BASE_URL}/${date}?access_key=${KEY_BUFF.toString(
        "ascii"
      )}`; //&symbols=BTC,ETH
      queryCoinLayerAPI(reqURL, setData);
    }
  }, [date]);
  return data;
}

export function useDataRange(startDate, endDate) {
  // "Timeframe" endpoint - request a range of values. This powers the graph component.
  console.log("useRates - startDate:", startDate, "endDate:", endDate);
  const [data, setData] = useState({});
  useEffect(() => {
    const reqURL = `https://api.coinlayer.com/timeframe?access_key=${KEY_BUFF.toString(
      "ascii"
    )}&start_date=${startDate}&end_date=${endDate}&symbols=BTC,ETH,XRP,EOS,LTC,BCH,BNB`;
    queryCoinLayerAPI(reqURL, setData);
  }, [startDate, endDate]);
  return data;
}

function queryCoinLayerAPI(reqURL, setData) {
  // Called by all 3 hooks to grab data.
  axios
    .get(reqURL)
    .then(response => {
      console.log(response);
      setData(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}
