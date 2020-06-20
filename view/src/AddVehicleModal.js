import React, { Component } from "react";
import "./index.css";
import { Modal, Button, Icon } from "antd";
import VehicleDetails from "./VehicleDetails";
import Api from "./Api";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const api = new Api();
class AddVehicleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      address: "",
      type: "Car",
      costPerDay: 0,
      contactNumber: 0,
      vehicleAvailability: "Available"
    };
  }

  getstuff = async address => {
    const results = await geocodeByAddress(address);
    const latLong = await getLatLng(results[0]);

    console.log(latLong);
    return latLong;
  };

  handleAddressChange = value => {
    this.setState({ address: value.target.value });
  };

  handleVehicleChange = value => {
    this.setState({ type: value.target.value });
  };

  handleCostChange = value => {
    this.setState({ costPerDay: value.target.value });
  };

  handleContactChange = value => {
    this.setState({ contactNumber: value.target.value });
  };

  handleAvailabilityChange = value => {
    this.setState({ vehicleAvailability: value.target.value });
  };

  showModal = () => {
    this.setState({ 
      visible: true
    });
  };

  handleOk = async () => {
    const latLong = await this.getstuff(this.state.address);
    const reqObj = {
      address: this.state.address,
      type: this.state.type,
      costPerDay: this.state.costPerDay,
      contactNumber: this.state.contactNumber,
      vehicleAvailability: this.state.vehicleAvailability,
      id: JSON.parse(localStorage.getItem("decodedToken")).email,
      lattitude: latLong.lat,
      longitude: latLong.lng,
      email: JSON.parse(localStorage.getItem("decodedToken")).email
    };

    api.addVehicle(reqObj);

    this.setState({
      confirmLoading: true
    });

    setTimeout(() => {
      this.setState({ confirmLoading: false, visible: false });
    }, 1000);
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <div className='anvb'>

        <Button type="primary" onClick={this.showModal} size='large'>
          Add New Vehicle
        </Button>
        </div>
        <Modal
          title="Add Vehicle Details"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <VehicleDetails
            handleAddressChange={this.handleAddressChange}
            handleVehicleChange={this.handleVehicleChange}
            handleCostChange={this.handleCostChange}
            handleContactChange={this.handleContactChange}
            handleAvailabilityChange={this.handleAvailabilityChange}
          />
        </Modal>
      </div>
    );
  }
}

export default AddVehicleModal;
