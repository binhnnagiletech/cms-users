const data = [
  {
    key: '1',
    name: 'Brown',
    age: 32,
    gender: 'male',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Green',
    age: 42,
    gender: 'female',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Black',
    age: 32,
    gender: 'male',
    address: 'Sidney No. 1 Lake Park',
  },
];

const HomeModel = {
  namespace: 'home',
  state: {
    users: data,
  },
  reducers: {
    add(state, action) {
      const { username: name, ...rest } = action.payload;
      const newUser = {
        key: Math.random(9).toString(),
        name,
        ...rest,
      };
      return {
        ...state,
        users: [...state.users, newUser],
      };
    },
    delete(state, action) {
      return {
        ...state,
        users: state.users.filter((user) => user.key !== action.payload),
      };
    },
    edit(state, action) {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.key !== action.payload.key) return user;
          return {
            ...user,
            ...action.payload,
          };
        }),
      };
    },
  },
  effects: {},
};

export default HomeModel;
