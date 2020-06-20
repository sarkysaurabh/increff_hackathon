import React, { Component } from "react";
import "antd/dist/antd.css";
import "./index.css";

import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

class MapTab extends Component {
  getstuff = () => {
    geocodeByAddress("increff")
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng));
  };

  render() {
    this.getstuff();
    return <p>hello</p>;
  }
}

export default MapTab;
