import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SortArrow(props) {
  const { setSort, column } = props;
  return (
    <>
      <button
        className="btn"
        onClick={() => setSort(`${column}-asc`)}
        style={{ margin: 0, padding: 2 }}
      >
        <FontAwesomeIcon icon="sort-up" />
      </button>
      <button
        className="btn"
        onClick={() => setSort(`${column}-dsc`)}
        style={{ margin: 0, padding: 2 }}
      >
        <FontAwesomeIcon icon="sort-down" />
      </button>
    </>
  );
}
