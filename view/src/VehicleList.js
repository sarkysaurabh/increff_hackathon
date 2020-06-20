import React, { Component } from "react";
import { List, Avatar, Icon, Button } from "antd";
import Api from "./Api";
import { Tooltip } from 'antd';
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
class VehicleList extends Component {
  splitEmail = id => {
    const pos = id.search("#");
    return {
      email: id.substring(0, pos),
      id: id.substring(pos + 1, id.length)
    };
  };

  handleOnClick = e => {
    const data = this.splitEmail(e.target.id);
    const fromEmailId = JSON.parse(localStorage.getItem("decodedToken")).email;
    const toEmailId = data.email;
    const postId = data.id;
    api.sendEmail(fromEmailId, toEmailId, postId, success);
  };

  render() {
    const vehiclePics = new Map([
      ["Car", "https://auto.ndtvimg.com/car-images/big/ferrari/portofino/ferrari-portofino.jpg"],
      ["Cycle", "https://n4.sdlcdn.com/imgs/a/9/a/Hero-Black-Blue-Adult-Cycle-SDL608165390-1-93e0f.jpg"],
      ["MotorCycle", "https://4.imimg.com/data4/OO/OO/GLADMIN-/en-in-uploads-bike-360-823-500x500.jpg"]
    ]);
    const listData = this.props.data;
    return (
        <div className='vehicleList'>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={listData}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
                <Tooltip title="Click to notify owner by email">
                    <Button onClick={this.handleOnClick} id={item.email.concat("#", item.id)}>
                        Show Interest!
                    </Button>
                </Tooltip>
            ]}
            extra={<img width={250} height={200} alt={item.type} src={vehiclePics.get(item.type)} />}
          >
            <List.Item.Meta
              avatar={<Avatar>{item.email}</Avatar>}
              title={<a href={item.id}>Address:</a>}
              description={item.address}
            />
            {item.content}
          </List.Item>
        )}
      />
      </div>
    );
  }
}

export default VehicleList;
