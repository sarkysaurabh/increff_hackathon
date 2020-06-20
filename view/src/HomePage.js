import React, { Component } from "react";
import "antd/dist/antd.css";
import "./index.css";
import LendTab from "./LendTab";
import BorrowTab from "./BorrowTab";
import { Tabs, Button, Avatar, Dropdown } from "antd";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
  console.log("huit");
}

class App extends Component {
  getAvatar = () => {
    let token = JSON.parse(localStorage.getItem("decodedToken"));

    if (token.picture) {
      return <Avatar src={token.picture} />;
    }
    if (token.name) {
      return <Avatar>{token.name}</Avatar>;
    }

    return <Avatar>{token.email}</Avatar>;
  };

  render() {
    const logoutButton = <Button onClick={this.props.logout} type='danger'>Logout</Button>;
    console.log("hello");
    return (
      <div id="container" style={{ padding: 24 }}>
        <Tabs defaultActiveKey="4" onChange={callback} tabBarExtraContent={logoutButton}>
          <TabPane tab="Borrow Vehicles" key="1">
            <BorrowTab />
          </TabPane>
          <TabPane tab="Lend Vehicles" key="4">
            <LendTab />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
