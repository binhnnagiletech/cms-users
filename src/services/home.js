import request from '@/utils/request';

// let users = [
//   {
//     key: 1,
//     name: 'mmacmeanma0',
//     age: 1,
//     address: '2',
//     gender: 'Male',
//     status: '1',
//   },
//   {
//     key: 2,
//     name: 'efeatherbie1',
//     age: 2,
//     address: '819',
//     gender: 'Male',
//     status: '1',
//   },
//   {
//     key: 3,
//     name: 'ssefton2',
//     age: 3,
//     address: '7',
//     gender: 'Male',
//     status: '0',
//   },
// ];

export async function queryUsersDb() {
  return request('/users');
}

export function queryUserAdd(values) {
  console.log('values add', values);
  return request('/users', {
    method: 'POST',
    data: values,
  });
}

export function queryUserDelete(values) {
  console.log('values delete', values);
  return request(`/users/${values}`, {
    method: 'DELETE',
  });
}

export function queryUserEdit(values) {
  console.log('values edit', values);
  return request(`/users/${values.id}`, {
    method: 'PATCH',
    data: values,
  });
}

export function queryUsersFilter(values) {
  console.log('values filter', values);
  return request(`/users?status=${values}&status=${values}`);
}

export function queryUserSearch(values) {
  console.log('values seach', values);
  return request(`/users?name=${values}`, {
    method: 'GET',
    payload: values,
  });
}

export function queryUserActive(values) {
  return request(`/users/${values.id}`, {
    method: 'PUT',
    data: {
      ...values,
      status: 1 * !parseInt(values.status, 10),
    },
  });
}
