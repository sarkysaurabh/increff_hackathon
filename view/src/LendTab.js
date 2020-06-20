import React, { Component } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Button, Modal } from "antd";
import AddVehicleModal from "./AddVehicleModal";
import OwnerVehicleList from "./OwnerVehicleList";

class LendTab extends Component {
  render() {
    console.log("lend tab");
    return (
      <div>

        {/* <div className='anv'> Click below button to Add new Vehicle to Lend.</div> */}
        <AddVehicleModal />

        <div className='lva'> List of Vehicles Added by you: </div>
        <OwnerVehicleList />
      </div>
    );
  }
}

export default LendTab;
