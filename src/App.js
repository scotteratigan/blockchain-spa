import React from "react";
import "./App.css";
// import LiveRates from "./Components/LiveRates";
import Header from "./Components/Header";
import Historical from "./Components/Historical";
import HistoryChart from "./Components/HistoryChart";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { fab } from "@fortawesome/free-brands-svg-icons";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  library.add(faSortUp, faSortDown);
  return (
    <div className="App">
      <Header />
      <HistoryChart />
      {/* <LiveRates /> */}
      {/* <Historical /> */}
    </div>
  );
}
