/*
  Currently unused component - gives current-day quotes.
*/

// Libraries:
import React from "react";
import RateTable from "./RateTable";
// Hooks:
import { useLiveRates } from "../Hooks/useRates";

export default function LiveRates() {
  const data = useLiveRates();
  if (data.rates && data.rates.BTC) {
    return <RateTable data={data} />;
  } else {
    return <> Loading data... </>;
  }
}
