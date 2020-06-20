import React, { Component } from "react";
import { List, Avatar, Icon, Button } from "antd";
import Api from "./Api";
import AvailabilityToggler from './AvailabilityToggler';
import { message } from 'antd';
import "./index.css";

const success = () => {
  message.success('Owner Notified Sucessfully!');
};


const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const api = new Api();
class OwnerVehicleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: []
    };
  }

  handleOnClick = e => {
    const data = this.splitEmail(e.target.id);
    const fromEmailId = JSON.parse(localStorage.getItem("decodedToken")).email;
    const toEmailId = data.email;
    const postId = data.id;
    api.sendEmail(fromEmailId, toEmailId, postId, success);
  };

  makeVehicleAvailable = e => {
    api.setAvailability(e.target.id, "Available");
  };

  makeVehicleUnAvailable = e => {
    api.setAvailability(e.target.id, "UnAvailable");
  };

  setData = listData => {
    console.log(listData);
    this.setState({ listData: listData });
  };

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextState);
    console.log(this.state);
    if (JSON.stringify(nextState.listData) == JSON.stringify(this.state.listData)) return false;
    return true;
  }

  render() {
    const vehiclePics = new Map([
      ["Car", "https://auto.ndtvimg.com/car-images/big/ferrari/portofino/ferrari-portofino.jpg"],
      ["Cycle", "https://n4.sdlcdn.com/imgs/a/9/a/Hero-Black-Blue-Adult-Cycle-SDL608165390-1-93e0f.jpg"],
      ["MotorCycle", "https://media.zigcdn.com/media/model/2017/Mar/renegade-commando-right_600x300.jpg"]
    ]);
    api.getOwnerData(JSON.parse(localStorage.getItem("decodedToken")).email, this.setData);
    const listData = this.state.listData;
    console.log(listData);
    return (
        <div className='owl'>
      <List
        itemLayout="vertical"
        size="medium"
        dataSource={listData}
        renderItem={item => (
          <List.Item key={item.id} extra={<img width={272} alt={item.type} src={vehiclePics.get(item.type)} style={{width: 300, height:200}}/>}>
            <List.Item.Meta
              avatar={<Avatar>{item.email}</Avatar>}
              title={<a href={item.id}>Address:</a>}
              description={item.address}
            />
            <AvailabilityToggler postId={item.id} availability={item.vehicleAvailability}/>
          </List.Item>
        )}
      />
      </div>
    );
  }
}

export default OwnerVehicleList;
