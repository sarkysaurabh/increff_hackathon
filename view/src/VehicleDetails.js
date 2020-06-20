import React, { Component } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Menu, Dropdown, Button, Icon, message } from "antd";

import { Input } from "antd";

class VehicleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVehicle: "Car",
      selectedAvailability: "Available"
    };
  }

  handleMenuClick = e => {
    // message.info('Click on menu item.');
    console.log("click", e);
    this.props.handleVehicleChange({
      target: {
        value: e.item.props.children
      }
    });
    this.setState({ selectedVehicle: e.item.props.children });
  };

  render() {
    const vehicleMenu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">Car</Menu.Item>
        <Menu.Item key="2">Cycle</Menu.Item>
        <Menu.Item key="3">MotorCycle</Menu.Item>
      </Menu>
    );

    const availabilityMenu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">Available</Menu.Item>
        <Menu.Item key="2">UnAvailable</Menu.Item>
        <Menu.Item key="3">Lent</Menu.Item>
      </Menu>
    );

    const selectedVehicle = this.state.selectedVehicle;
    const selectedAvailability = this.state.selectedAvailability;
    return (
      <div>
        <Input placeholder="Address" onChange={this.props.handleAddressChange} />
        <Input placeholder="Cost Per day" onChange={this.props.handleCostChange} />
        <Input placeholder="Contact Number" onChange={this.props.handleContactChange} />
        <Dropdown overlay={vehicleMenu}>
          <Button>
            Vehicle Type: {selectedVehicle} <Icon type="down" />
          </Button>
        </Dropdown>
        <br />
        <br />
        <Dropdown overlay={availabilityMenu}>
          <Button>
            Vehicle Availability: {selectedAvailability} <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

export default VehicleDetails;
