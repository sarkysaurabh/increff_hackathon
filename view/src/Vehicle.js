import React, { Component } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Card, Descriptions } from "antd";
const { Meta } = Card;

//car: https://auto.ndtvimg.com/car-images/big/ferrari/portofino/ferrari-portofino.jpg
//cycle: https://n4.sdlcdn.com/imgs/a/9/a/Hero-Black-Blue-Adult-Cycle-SDL608165390-1-93e0f.jpg
//bike: https://4.imimg.com/data4/OO/OO/GLADMIN-/en-in-uploads-bike-360-823-500x500.jpg

class Vehicle extends Component {
  render() {
    const vehiclePics = new Map([
      ["Car", "https://auto.ndtvimg.com/car-images/big/ferrari/portofino/ferrari-portofino.jpg"],
      ["Cycle", "https://n4.sdlcdn.com/imgs/a/9/a/Hero-Black-Blue-Adult-Cycle-SDL608165390-1-93e0f.jpg"],
      ["MotorCycle", "https://4.imimg.com/data4/OO/OO/GLADMIN-/en-in-uploads-bike-360-823-500x500.jpg"]
    ]);
    // const type = this.props.data.type;
    const type = "Car";
    return (
      <Card hoverable style={{ width: 500 }} cover={<img alt={type} src={vehiclePics.get(type)} />}>
        <Descriptions title="Vehicle Info">
          <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
          <br />
          <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
          <br />

          <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
          <br />

          <Descriptions.Item label="Remark">empty</Descriptions.Item>
          <br />

          <Descriptions.Item label="Address">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>
      </Card>
    );
  }
}

export default Vehicle;
