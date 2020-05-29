import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm, Form, Modal } from 'antd';
import { connect } from 'dva';
// import { log } from 'lodash-decorators/utils';

const FormItem = Form.Item;

const ListUser = ({ users, dispatch }) => {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  // const [form] = Form.useForm();
  const handleDelete = (record) => {
    dispatch({
      type: 'home/delete',
      payload: record,
    });
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (data) => {
    console.log(data, 'data');
    dispatch({
      type: 'home/add',
      payload: data,
    });
    setVisible(false);
  };

  const handleEdit = (data) => {
    console.log(data, 'data');
    dispatch({
      type: 'home/edit',
      payload: data,
    });
    setVisible1(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  // console.log(form,'values');

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'status',
      dataIndex: 'status',
      filters: [
        {
          text: '0',
          value: '0',
        },
        {
          text: '1',
          value: '1',
        },
      ],
      onFilter: (value, record) => {
        // console.log(record.status,'record');

        dispatch({
          type: 'home/filter',
          payload: record,
        });
      },
    },
    {
      title: 'gender',
      dataIndex: 'gender',
    },
    {
      title: 'timecCreate',
      dataIndex: 'timecCreate',
    },
    {
      title: 'timeUpdate',
      dataIndex: 'timeUpdate',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => (
        <>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>

          <a onClick={() => setVisible1(true)}> edit</a>
          <Modal title="EDIT" visible={visible1} footer={null} onCancel={() => setVisible1(false)}>
            <Form onFinish={handleEdit} initialValues={record}>
              <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="key" name="key">
                <Input readOnly />
              </FormItem>
              <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Name" name="name">
                <Input />
              </FormItem>
              <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Name" name="phone">
                <Input />
              </FormItem>
              <FormItem
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 15 }}
                label="Name"
                name="address"
              >
                <Input />
              </FormItem>
              <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Name" name="status">
                <Input />
              </FormItem>
              <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="Name" name="gender">
                <Input />
              </FormItem>
              <FormItem
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 15 }}
                label="Name"
                name="timecCreate"
              >
                <Input />
              </FormItem>
              <FormItem
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 15 }}
                label="Name"
                name="timeUpdate"
              >
                <Input />
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit">
                  SUBMIT
                </Button>
                <Button type="primary" onClick={() => setVisible(false)}>
                  {' '}
                  CANCEL
                </Button>
              </FormItem>
            </Form>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add
      </Button>
      <Modal title="ADD USERS" visible={visible} onCancel={handleCancel} footer={null}>
        <Form onFinish={handleOk}>
          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="name" name="name">
            <Input />
          </FormItem>
          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="phone" name="phone">
            <Input />
          </FormItem>
          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="address" name="address">
            <Input />
          </FormItem>
          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="status" name="status">
            <Input />
          </FormItem>
          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="gender" name="gender">
            <Input />
          </FormItem>
          <FormItem
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 15 }}
            label="timecCreate"
            name="timecCreate"
          >
            <Input />
          </FormItem>
          <FormItem
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 15 }}
            label="timeUpdate"
            name="timeUpdate"
          >
            <Input />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              SUBMIT
            </Button>
            <Button type="primary" onClick={() => setVisible(false)}>
              {' '}
              CANCEL
            </Button>
          </FormItem>
        </Form>
      </Modal>
      <Table rowKey={(r) => r.uid || r.name} dataSource={users} columns={columns} bordered />;
    </>
  );
};

export default connect((state) => {
  return {
    users: state.home.users,
  };
})(ListUser);
