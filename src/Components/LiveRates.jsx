import React from "react";
// import API from "../Util/Api";
import RateTable from "./RateTable";
import { useLiveRates } from "../Hooks/useRates";
// import useRates from "../Hooks/useRates";

export default function LiveRates() {
  const data = useLiveRates();
  if (data.rates && data.rates.BTC) {
    return <RateTable data={data} />;
  } else {
    return <> Loading data... </>;
  }
}
