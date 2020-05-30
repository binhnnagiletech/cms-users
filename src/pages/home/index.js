import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Table, Button, Popconfirm, Modal, Form, Input, InputNumber, Select } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Search } = Input;

const { Column } = Table;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 16 },
};

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

// const validateMessages = {
//   required: '${label} is required!',
//   types: {
//     email: '${label} is not validate email!',
//     number: '${label} is not a validate number!',
//   },
//   number: {
//     range: '${label} must be between ${min} and ${max}',
//   },
// };

const DemoUser = ({ addLoading, loading, users, dispatch }) => {
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);

  useEffect(() => {
    if (!addLoading) {
      setVisible(false);
    }
  }, [addLoading]);

  useEffect(() => {
    dispatch({
      type: 'home/fetchUsers',
    });
  }, []);

  const onFinish = (values) => {
    console.log('values', values);
    dispatch({
      type: 'home/postUserAdd',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onFinishEdit = (values) => {
    dispatch({
      type: 'home/edit',
      payload: values,
    });
    console.log('vales', values);
    setVisibleEdit(false);
  };

  const onFinishEditFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = (pagination, filters) => {
    dispatch({
      type: 'home/filter',
      payload: filters,
    });
  };

  return (
    <div>
      <Button
        type="primary"
        style={{
          marginBottom: 16,
        }}
        onClick={() => setVisible(true)}
      >
        Add a row
      </Button>
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        suffix={suffix}
        onChange={(e) => {
          dispatch({
            type: 'home/search',
            payload: e.target.value,
          });
        }}
        allowClear={false}
        style={{ marginBottom: 17 }}
      />
      <Modal title="Basic Modal" visible={visible} footer={null}>
        <Form {...layout} name="control-hooks" onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
              <Option value="false">0</Option>
              <Option value="true">1</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button loading={addLoading} type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="default" onClick={() => setVisible(false)} style={{ marginLeft: 10 }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        loading={loading}
        dataSource={users}
        rowKey={(r) => r.name}
        bordered
        onChange={onChange}
      >
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column title="Gender" dataIndex="gender" key="gender" />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          filters={[
            {
              text: '0',
              value: '0',
            },
            {
              text: '1',
              value: '1',
            },
          ]}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => {
            return users.length >= 1 ? (
              <>
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() =>
                    dispatch({
                      type: 'home/delete',
                      payload: record.key,
                    })
                  }
                >
                  <a>Delete</a>
                </Popconfirm>
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
                <Modal title="Basic Modal" visible={visibleEdit} footer={null}>
                  <Form
                    {...layout}
                    name="control-hooks"
                    onFinish={onFinishEdit}
                    onFinishFailed={onFinishEditFailed}
                    initialValues={record}
                  >
                    <Form.Item label="Key" name="key">
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
                        <Option value="0">0</Option>
                        <Option value="1">1</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                      <Button
                        type="default"
                        onClick={() => setVisibleEdit(false)}
                        style={{ marginLeft: 10 }}
                      >
                        Cancel
                      </Button>
                    </Form.Item>
                  </Form>
                </Modal>
              </>
            ) : null;
          }}
        />
      </Table>
    </div>
  );
};

export default connect((state) => {
  return {
    users: state.home.users,
    addLoading: state.loading.effects['home/postUserAdd'],
    loading: state.loading.effects['home/fetchUsers'],
  };
})(DemoUser);
