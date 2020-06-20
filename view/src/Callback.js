import React from "react";
import { Spin } from 'antd';
import "./index.css";

const Callback = () => (
  <div className="container">
    <h4>Loading...</h4>
    <Spin size="large" />
  </div>

);

export default Callback;
