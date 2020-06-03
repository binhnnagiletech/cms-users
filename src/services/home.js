import request from '@/utils/request';

export async function query() {
  return request('/users', {
    method: 'GET',
  });
  // return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(users);
  //     }, 2000);
  //   });
}

export async function queryDeleteUser(values) {
  console.log(values, 'values');

  return request(`/users/${values}`, {
    method: 'DELETE',
  });
  // return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(users);
  //     }, 2000);
  //   });
}

export async function queryAddUser(values) {
  return request('/users', {
    method: 'POST',
    data: values,
  });
  // return new Promise((resolve) => {

  //     setTimeout(() => {
  //       users = [
  //         ...users,
  //         {
  //           ...values,
  //         },
  //       ];

  //       resolve();
  //     }, 3000);
  //   }, 3000);
}

export async function queryEditUser(params) {
  return request(`/users/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}

export async function queryFilterUser(params) {
  return request(`/users?status=${params.status}`, {
    method: 'GET',
  });
}

export async function querySearchUser(params) {
  return request(`/users?name=${params}`, {
    method: 'GET',
    data: params,
  });
}

export async function queryChangeStatusUser(values) {
  const value = values;
  //
  return request(`/users/${values.id}`, {
    method: 'PUT',
    data: {
      ...value,
      status: 1 * !parseInt(value.status, 10),
    },
  });
}
