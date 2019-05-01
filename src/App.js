import React from "react";
import "./App.css";
// import LiveRates from "./Components/LiveRates";
import Historical from "./Components/Historical";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <p>This is a work-in-progress app.</p>
        {/* <LiveRates /> */}
        <Historical />
      </div>
    );
  }
}

export default App;
