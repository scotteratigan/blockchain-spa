import React from "react";

function RateTable(props) {
  if (!props.data || !props.data.success) {
    return <div>Loading data...</div>;
  }

  // convert object to array of JSX:
  const { rates } = props.data;
  let rateJSX = [];
  for (let key in rates) {
    console.log(rates[key]);
    rateJSX.push(
      <tr key={key}>
        <td>{key}</td>
        <td>{rates[key]}</td>
      </tr>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Coin</th>
          <th>Rates (USD)</th>
        </tr>
      </thead>
      <tbody>{rateJSX}</tbody>
    </table>
  );
}

export default RateTable;
