/*
  A very basic header component.
*/

import React from "react";

export default function Header() {
  return (
    <div className="jumbotron text-center">
      <h1 className="display-4">CryptoDisplay</h1>
      <p className="lead">Explore cryptocurrencies in React.</p>
      <hr className="my-2" />
      <p>A simple app by Scott Ratigan.</p>
    </div>
  );
}
