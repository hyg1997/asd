import React, { Component } from 'react';

import {
  Input,
  Form,
  InputNumber,
  Button,
  Icon,
} from 'antd';


class ClientAddEdit extends Component {
  state = {
    client: {
      key: '',
      name: '',
      lastname: '',
      age: 1,
      address: ''
    },
    isEditing: false
  }

  componentDidMount = () => {
    const { param } = this.props.match.params;
    console.log(param);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please enter a valid name!' }],
            initialValue: this.state.name
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Name"
            />,
          )}
        </Form.Item>
        <Form.Item label="Lastname">
          {getFieldDecorator('lastname', {
            rules: [{ required: true, message: 'Please enter a valid lastname!' }],
            initialValue: this.state.lastname
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Lastname"
            />,
          )}
        </Form.Item>
        <Form.Item label="Age">
          {getFieldDecorator('age', { initialValue: this.state.age })(<InputNumber min={1} max={150} />)}
          <span className="ant-form-text">years</span>
        </Form.Item>
        <Form.Item label="Address">
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Please enter a valid address!' }],
            initialValue: this.state.address
          })(
            <Input
              prefix={<Icon type="address" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Address"
            />,
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Save
            </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedClientAddEdit = Form.create({ name: 'client_add_edit' })(ClientAddEdit);

export default WrappedClientAddEdit;