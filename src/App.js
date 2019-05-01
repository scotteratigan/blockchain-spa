import React from "react";
import Header from "./Components/Header";
import Historical from "./Components/Historical";
import HistoryChart from "./Components/HistoryChart";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import useSize from "./Hooks/useSize";

export default function App() {
  library.add(faSortUp, faSortDown);
  const screen = useSize();
  return (
    <div className="App">
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: `${screen.width < 600 ? "column" : "row"}`
        }}
      >
        <HistoryChart />
        <Historical />
      </div>
    </div>
  );
}
