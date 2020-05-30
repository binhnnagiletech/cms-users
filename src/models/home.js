import { queryUsersDb, queryUserAdd } from '@/services/home';

const HomeModel = {
  namespace: 'home',
  state: {
    users: [],
  },
  effects: {
    *fetchUsers(_, { call, put }) {
      const response = yield call(queryUsersDb);
      yield put({
        type: 'view',
        payload: response,
      });
    },
    *postUserAdd({ payload }, { call, put }) {
      const response = yield call(queryUserAdd, payload);
      console.log('response', response);
      // console.log('payload', payload);

      yield put({
        type: 'fetchUsers',
      });
    },
  },
  reducers: {
    view(state, action) {
      return {
        ...state,
        users: action.payload,
      };
    },
    add(state, { payload }) {
      // const newUser = {
      //   key: Math.random(9).toString(),
      //   ...action.payload,
      // };
      console.log('newUser', payload);
      return {
        ...state,
        users: [...state.users, payload],
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
    filter(state, action) {
      console.log(action.payload);
      return {
        ...state,
        users: state.users.filter((user) => action.payload.status.includes(user.status)),
      };
    },
    search(state, action) {
      return {
        ...state,
        users: state.users.filter((user) =>
          user.name.toLowerCase().includes(action.payload.toLowerCase()),
        ),
      };
    },
  },
};

export default HomeModel;
