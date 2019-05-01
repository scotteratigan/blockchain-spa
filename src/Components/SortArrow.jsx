import React, { useState } from "react";

const containerStyle = {
  width: 25,
  display: "flex",
  flexDirection: "column"
};

export default function SortArrow(props) {
  const [arrSelected, setArrSelected] = useState("");
  const { setSort, column } = props;
  return (
    <div style={containerStyle}>
      <button
        style={arrSelected === "up" ? { fontWeight: "bold" } : null}
        onClick={() => {
          setArrSelected("up");
          setSort(`${column}-asc`);
        }}
      >
        ^
      </button>
      <button
        style={arrSelected === "down" ? { fontWeight: "bold" } : null}
        onClick={() => {
          setArrSelected("down");
          setSort(`${column}-dsc`);
        }}
      >
        v
      </button>
    </div>
  );
}
