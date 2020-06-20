import React, { Component } from "react";
import "antd/dist/antd.css";
import "./index.css";
import Api from "./Api";
import MapTab from "./MapTab";
import LendTab from "./LendTab";
import VehicleDetails from "./VehicleDetails";
import BorrowTab from "./BorrowTab";
import VehicleList from "./VehicleList";
import { Tabs, Button, Avatar, Dropdown, Icon } from "antd";
import { Tooltip } from 'antd';
import { message } from 'antd';

const success = () => {
  message.success('This is a message of success');
};


const { TabPane } = Tabs;

const api = new Api();
class AvailabilityToggler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availability: this.props.availability
    };
  }

  toggleThem = () => {
    // debugger;
    const availability = this.state.availability == "Available" ? "UnAvailable" : "Available";
    api.setAvailability(this.props.postId, availability);
    this.setState({ availability: availability });
  };

  render() {
      console.log(this.props.availability);
      console.log(this.props.postId);
    const availability = this.state.availability;
    let icon = <Icon />;
    if(availability == 'Available') icon = <Icon type="check-circle" theme="twoTone" twoToneColor="#4ed60a" />;
    else icon = <Icon type="close-circle" theme="twoTone" twoToneColor="e02500" />;
    return (
      <div>
        <Tooltip title="Click to Toggle Availability of this vehicle">
            <Button onClick={this.toggleThem} type="default">
                Toggle Vehicle Status
            </Button>
        </Tooltip>
        <span> {availability} </span>
        {icon}
        
      </div>
    );
  }
}

export default AvailabilityToggler;
