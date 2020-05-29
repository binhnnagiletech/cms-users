const dataSource = [
  {
    key: '0',
    name: 'Edward King 0',
    phone: '1111',
    address: 'London, Park Lane no. 0',
    status: '1',
    gender: 'male',
    timecCreate: '11:11',
    timeUpdate: '22:22',
  },
  {
    key: '1',
    name: 'Edward King 0',
    phone: '1111',
    address: 'London, Park Lane no. 0',
    status: '0',
    gender: 'male',
    timecCreate: '11:11',
    timeUpdate: '22:22',
  },
  {
    key: '2',
    name: 'EdwardKing0',
    phone: '222222',
    address: 'London Park Lane no. 0',
    status: '1',
    gender: 'male',
    timecCreate: '11:11',
    timeUpdate: '22:22',
  },
];
const HomeModel = {
  namespace: 'home',
  state: {
    users: dataSource,
  },
  reducers: {
    delete(state, action) {
      return {
        ...state,
        users: state.users.filter((item) => item.key !== action.payload),
      };
    },
    add(state, action) {
      const { ...rest } = action.payload;
      const newUser = {
        uid: Math.random(9).toString(),
        ...rest,
      };
      // console.log('users', state.users);
      // console.log('action', action)
      return {
        ...state,
        users: [...state.users, newUser],
      };
    },
    edit(state, action) {
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.key !== action.payload.key) {
            return u;
          }
          return {
            ...u,
            ...action.payload,
          };
        }),
      };
    },
    filter(state, action) {
      console.log(action.payload.status, 'action.payload.status');

      //   return {
      //       ...state,
      //       users: state.users.filter(fil => fil.status == action.payload.status)
      //   }
    },
  },
  effects: {},
};

export default HomeModel;
