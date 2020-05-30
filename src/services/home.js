// import request from '@/utils/request';

let users = [];

export async function queryUsersDb() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 2000);
  });
}

export function queryUserAdd(values) {
  return new Promise((resolve) => {
    setTimeout(() => {
      users = [
        ...users,
        {
          ...values,
        },
      ];

      resolve();
    }, 3000);
  }, 3000);

  // return request('/users', {
  //   method: 'POST',
  //   data: values,
  // });
}
