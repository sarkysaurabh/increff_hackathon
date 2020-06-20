import React, { Component } from "react";
import "antd/dist/antd.css";
import "./index.css";
import Post from "./Post";
import Api from "./Api";
import { Card, Col, Row } from "antd";

const api = new Api();
const CARDS_PER_ROW = 3;
class Feed extends Component {
  render() {
    // return (
    // <div>
    //   <Post img="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" title="Europe Street beat" desc="www.instagram.com"></Post>
    //   <Post img="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" title="Europe Street beat" desc="www.instagram.com"></Post>
    //   <Post img="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" title="Europe Street beat" desc="www.instagram.com"></Post>
    // </div>
    // );

    return (
      <div>
        <Row>
          <Col span={8}>
            <Post
              img="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              title="Europe Street beat"
              desc="www.instagram.com"
            ></Post>
          </Col>
          <Col span={8}>
            <Post
              img="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              title="Europe Street beat"
              desc="www.instagram.com"
            ></Post>
          </Col>
          <Col span={8}>
            <Post
              img="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              title="Europe Street beat"
              desc="www.instagram.com"
            ></Post>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Post
              img="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              title="Europe Street beat"
              desc="www.instagram.com"
            ></Post>
          </Col>
          <Col span={8}>
            <Post
              img="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              title="Europe Street beat"
              desc="www.instagram.com"
            ></Post>
          </Col>
          <Col span={8}>
            <Post
              img="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              title="Europe Street beat"
              desc="www.instagram.com"
            ></Post>
          </Col>
        </Row>
      </div>
    );

    // const data = api.getData();

    //     return (
    //         data.map((obj) => {<Post img={obj.img} title={obj.title} desc={obj.desc} />});
    //     );
  }
}

export default Feed;
