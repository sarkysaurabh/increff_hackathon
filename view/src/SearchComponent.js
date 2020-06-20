import React, { Component } from "react";
import { Form, Icon, Input, Button } from 'antd';
import "./index.css";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SearchComponent extends Component {

  handleSubmit = e => {
    e.preventDefault();
    
  };

  render() {
    const formItemLayout ={
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          };

              const buttonItemLayout = {
            wrapperCol: { span: 14, offset: 4 },
          };

    return (
        <div className='searchBox'>
      <Form layout="horizontal" onSubmit={this.handleSubmit} labelAlign='left' colon={false}>
        <Form.Item label={<h6 className='dist'>Distance in km</h6>} {...formItemLayout}>
            <Input
              onChange={this.props.handleDistanceChange}
              defaultValue={3}
              size="small"
            />
        </Form.Item>
        <Form.Item label={<h6 className='loc'>Source Address</h6>} {...formItemLayout}>
            <Input
            onChange={this.props.handleAddressChange}
            defaultValue='3rd Floor (Above Baskin Robbins), #1664, 27th Main Rd, Parangi Palaya, Sector 2, HSR Layout, Bengaluru, Karnataka 560102'
            size="small"
            />
        </Form.Item>
        <Form.Item>
            <div className='hitit'>
          <Button onClick={this.props.onSearch} type="primary" htmlType="submit" size='large' {...buttonItemLayout}>
            Find Vehicles NearBy
          </Button>
          </div>
        </Form.Item>
      </Form>
      </div>
    );
  }
}


export default SearchComponent;