import {
  query,
  queryAddUser,
  queryEditUser,
  queryDeleteUser,
  queryFilterUser,
  querySearchUser,
  queryChangeStatusUser,
} from '@/services/home';

const HomeModel = {
  namespace: 'home',
  state: {
    users: [],
  },
  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        users: action.payload,
      };
    },

    delete(state, action) {
      return {
        ...state,
        users: state.users.filter((item) => item.key !== action.payload),
      };
    },
    add(state, { payload }) {
      //     console.log('users', state);
      //   console.log('action', action)
      //   const newUser = {
      //     key: Math.random(9).toString(),
      //     ...action.payload,
      //   };

      return {
        ...state,
        users: [...state.users, payload],
      };
    },
    // edit(state, action) {
    //   return {
    //     ...state,
    //     users: state.users.map((u) => {
    //       if (u.key !== action.payload.key) {
    //         return u;
    //       }
    //       return {
    //         ...u,
    //         ...action.payload,
    //       };
    //     }),
    //   };
    // },
    filter(state, action) {
      return {
        ...state,
        users: action.payload,
      };
    },
    isactive(state, action) {
      console.log(state, 'state');
      console.log(action, 'action');
      return {};
    },
    search(state, action) {
      return {
        ...state,
        users: action.payload,
      };
    },
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(query);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *fetchAdd({ payload }, { call, put }) {
      const response = yield call(queryAddUser, payload);
      if (response) {
        yield put({
          type: 'fetch',
        });
      }
    },

    *fetchDelete({ payload }, { call, put }) {
      const response = yield call(queryDeleteUser, payload);
      if (response) {
        yield put({
          type: 'fetch',
        });
      }
    },

    *fetchFilter({ payload }, { call, put }) {
      if (payload.status.length === 2) {
        yield put({
          type: 'fetch',
        });
      }
      if (payload.status.length === 1) {
        const response = yield call(queryFilterUser, payload);
        yield put({
          type: 'filter',
          payload: response,
        });
      }
    },

    *fetchEdit({ payload }, { call, put }) {
      const response = yield call(queryEditUser, payload);
      if (response) {
        yield put({
          type: 'fetch',
        });
      }
    },

    *fetchSearch({ payload }, { call, put }) {
      if (payload.length === 0) {
        yield put({
          type: 'fetch',
        });
      } else {
        const response = yield call(querySearchUser, payload);
        console.log(response, 'response');
        if (response) {
          yield put({
            type: 'search',
            payload: response,
          });
        }
      }
    },

    *fetchChangeStatus({ payload }, { call, put }) {
      console.log(payload, 'payload');

      const response = yield call(queryChangeStatusUser, payload);
      console.log(response, 'response');
      yield put({
        type: 'fetch',
      });
    },
  },
};

export default HomeModel;
