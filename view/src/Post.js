import React, { Component } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Card } from "antd";
const { Meta } = Card;

class Post extends Component {
  render() {
    return (
      <Card hoverable style={{ width: 240, margin: 20 }} cover={<img alt="example" src={this.props.img} />}>
        <Meta title={this.props.title} description={this.props.desc} />
      </Card>
    );
  }
}

export default Post;
