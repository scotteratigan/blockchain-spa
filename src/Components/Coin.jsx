import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";

export default function Coin(props) {
  const { name } = props;
  return (
    <Popup trigger={<span>{name}</span>} position="right top" on="hover">
      <Card title="Info" />
    </Popup>
  );
}

const Card = ({ title }) => (
  <div className="card">
    <div className="header">{title}</div>
    <div className="content">This coin is ...</div>
  </div>
);
