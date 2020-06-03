import React, { useState } from 'react';

import { Input, Button, Popconfirm, Form, Modal } from 'antd';

const FormItem = Form.Item;

const Action = ({ record, dispatch }) => {
  const [visibleEdit, setVisibleEdit] = useState(false);
  const handleEdit = (data) => {
    console.log(data, 'data');
    dispatch({
      type: 'home/fetchEdit',
      payload: data,
    });
    setVisibleEdit(false);
  };

  const handleDelete = (values) => {
    dispatch({
      type: 'home/fetchDelete',
      payload: values,
    });
  };

  const hanldeActive = (values) => {
    dispatch({
      type: 'home/fetchChangeStatus',
      payload: values,
    });
  };
  return (
    <>
      <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
        <a>Delete</a>
      </Popconfirm>

      <a onClick={() => setVisibleEdit(true)}> EDIT</a>
      <Modal
        title="EDIT"
        visible={visibleEdit}
        footer={null}
        onCancel={() => setVisibleEdit(false)}
      >
        <Form onFinish={handleEdit} initialValues={record}>
          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="key" name="id">
            <Input readOnly />
          </FormItem>
          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Name" name="name">
            <Input />
          </FormItem>
          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Name" name="phone">
            <Input />
          </FormItem>
          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Name" name="address">
            <Input />
          </FormItem>
          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Name" name="status">
            <Input />
          </FormItem>
          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Name" name="gender">
            <Input />
          </FormItem>
          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Name" name="timeCreate">
            <Input />
          </FormItem>
          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Name" name="timeUpdate">
            <Input />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              SUBMIT
            </Button>
            <Button type="primary" onClick={() => setVisibleEdit(false)}>
              {' '}
              CANCEL
            </Button>
          </FormItem>
        </Form>
      </Modal>
      <Popconfirm title="Sure to delete?" onConfirm={() => hanldeActive(record)}>
        <a>Active</a>
      </Popconfirm>
    </>
  );
};

export default Action;
