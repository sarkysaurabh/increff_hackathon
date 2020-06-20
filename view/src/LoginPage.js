import React, { Component } from "react";
import { Button } from "antd";
import "./index.css";

class LoginPage extends Component {
  render() {
    return (
      <div className='login'>
        <Button type='primary' onClick={this.props.login}>Login</Button>
      </div>
    );
  }
  
}

export default LoginPage;
