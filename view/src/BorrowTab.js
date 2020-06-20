import React, { Component } from "react";
import "antd/dist/antd.css";
import "./index.css";
import Api from "./Api";
import VehicleList from "./VehicleList";
import { Button, Modal } from "antd";
import { InputNumber } from "antd";
import { Card, Col, Row } from "antd";
import SearchComponent from './SearchComponent'
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { Alert } from 'antd';

const api = new Api();
class BorrowTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dist: 3,
      address:'3rd Floor (Above Baskin Robbins), #1664, 27th Main Rd, Parangi Palaya, Sector 2, HSR Layout, Bengaluru, Karnataka 560102',
      data: []
    };
  }

  getstuff = async address => {
    const results = await geocodeByAddress(address);
    const latLong = await getLatLng(results[0]);

    return latLong;
  };

  handleAddressChange = (e) => {
    this.setState({address: e.target.value});
  };

  handleDistanceChange = (e) => {
    this.setState({dist: e.target.value});
  };

  handleDataChange = (res) => {
    this.setState({data: res});
  };

  onSearch = async (e) => {
    const latLong = await this.getstuff(this.state.address);
    api.getPostsAround(latLong.lat, latLong.lng, this.state.dist, this.handleDataChange);
  }

  render() {
    const data = this.state.data;
    return (
      <div>
        <Alert
      message="Informational Note"
      description="Search and Find Vehicles in your locality, according to distance."
      type="info"
      showIcon
    />
        <br />
       <SearchComponent handleAddressChange={this.handleAddressChange} handleDistanceChange={this.handleDistanceChange} onSearch={this.onSearch}/>
        <VehicleList data={this.state.data}/>
      </div>
    );
  }
}

export default BorrowTab;
