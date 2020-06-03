import React, { useState, useEffect } from 'react';

import { Table, Input, Button, Tag, Form, Modal } from 'antd';

import { AudioOutlined } from '@ant-design/icons';

import { connect } from 'dva';

import Action from './action';

const { Search } = Input;
// import { log } from 'lodash-decorators/utils';

const FormItem = Form.Item;

const ListUser = ({ addLoading, loading, users, dispatch }) => {
  const [visible, setVisible] = useState(false);

  // const [form] = Form.useForm();

  useEffect(() => {
    dispatch({
      type: 'home/fetch',
    });
  }, []);

  useEffect(() => {
    if (!addLoading) {
      setVisible(false);
    }
  }, [addLoading]);

  const showModal = () => {
    setVisible(true);
  };

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

  const handleOk = (data) => {
    dispatch({
      type: 'home/fetchAdd',
      payload: data,
    });
    setVisible(false);
  };

  const handleSearch = (e) => {
    dispatch({
      type: 'home/fetchSearch',
      payload: e.target.value,
    });
  };
  const handleCancel = () => {
    setVisible(false);
  };

  function onChange(pagination, filters) {
    dispatch({
      type: 'home/fetchFilter',
      payload: filters,
    });
  }

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '20%',
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
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        return <Tag color={status === 1 ? 'green' : 'red'}>{status}</Tag>;
      },
    },
    // {
    //   title: 'status',
    //   dataIndex: 'status',
    //   filters: [
    //     {
    //       text: '0',
    //       value: '0',
    //     },
    //     {
    //       text: '1',
    //       value: '1',
    //     },
    //   ],
    //   // onFilter: (value, record) => {

    //   //   dispatch({
    //   //     type: 'home/filter',
    //   //     payload: record,
    //   //   });
    //   // },
    // },
    {
      title: 'gender',
      dataIndex: 'gender',
    },
    {
      title: 'timeCreate',
      dataIndex: 'timeCreate',
    },
    {
      title: 'timeUpdate',
      dataIndex: 'timeUpdate',
    },

    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => <Action record={record} dispatch={dispatch} />,
    },
  ];

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add
      </Button>
      <Modal title="ADD USERS" visible={visible} onCancel={handleCancel} footer={null}>
        <Form onFinish={handleOk}>
          <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="id" name="id">
            <Input />
          </FormItem>
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
            <Button type="primary" htmlType="submit" loading={addLoading}>
              SUBMIT
            </Button>
            <Button type="primary" onClick={() => setVisible(false)}>
              {' '}
              CANCEL
            </Button>
          </FormItem>
        </Form>
      </Modal>
      <Search
        style={{
          paddingTop: 16,
          paddingBottom: 16,
        }}
        placeholder="input search text"
        enterButton="Search"
        size="large"
        suffix={suffix}
        onChange={handleSearch}
      />
      <Table
        loading={loading}
        rowKey={(r) => r.uid || r.name}
        dataSource={users}
        columns={columns}
        onChange={onChange}
        bordered
      />
      ;
    </>
  );
};

export default connect((state) => {
  return {
    users: state.home.users,
    addLoading: state.loading.effects['home/queryAddUser'],
    loading: state.loading.effects['home/query'],
  };
})(ListUser);
