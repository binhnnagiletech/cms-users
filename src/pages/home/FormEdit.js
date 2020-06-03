import React, { useState } from 'react';
import { Button, Modal, Form, Input, InputNumber, Select } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 16 },
};

function FormEdit({ record, dispatch }) {
  const [visibleEdit, setVisibleEdit] = useState(false);

  const onFinishEdit = (values) => {
    console.log('post edit', values);
    dispatch({
      type: 'home/postUserEdit',
      payload: values,
    });
    setVisibleEdit(false);
  };

  const onFinishEditFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <a
        type="primary"
        style={{
          marginBottom: 16,
          marginLeft: 10,
        }}
        onClick={() => setVisibleEdit(true)}
      >
        Edit
      </a>
      <Modal title="Modal Edit" visible={visibleEdit} footer={null}>
        <Form
          {...layout}
          name={record.id}
          onFinish={onFinishEdit}
          onFinishFailed={onFinishEditFailed}
          initialValues={record}
        >
          <Form.Item label="Id" name="id">
            <Input readOnly />
          </Form.Item>

          <Form.Item
            label="name"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={['age']}
            label="Age"
            rules={[{ required: true, type: 'number', min: 0, max: 99 }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please input your status!' }]}
          >
            <Select placeholder="Select status">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please input your status!' }]}
          >
            <Select placeholder="Select status">
              <Option value={0}>0</Option>
              <Option value={1}>1</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="default" onClick={() => setVisibleEdit(false)} style={{ marginLeft: 10 }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default FormEdit;
