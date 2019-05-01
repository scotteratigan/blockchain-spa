/*
  Component to allow columns to be sorted, ascending or descending.
  Requires props of column(string) and setSort to store in parent component's state
*/

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
