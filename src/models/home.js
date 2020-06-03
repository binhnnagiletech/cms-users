import {
  queryUsersDb,
  queryUserAdd,
  queryUserDelete,
  queryUserEdit,
  queryUsersFilter,
  queryUserSearch,
  queryUserActive,
} from '@/services/home';

const HomeModel = {
  namespace: 'home',
  state: {
    users: [],
  },
  effects: {
    *fetchUsers(_, { call, put }) {
      const response = yield call(queryUsersDb);
      // console.log('response view', response);
      yield put({
        type: 'view',
        payload: response,
      });
    },
    *postUserAdd({ payload }, { call, put }) {
      const response = yield call(queryUserAdd, payload);
      console.log('response add', response);

      yield put({
        type: 'add',
        payload: response,
      });
    },

    *postUserDelete({ payload }, { call, put }) {
      const response = yield call(queryUserDelete, payload);
      console.log('reponse delete: ', response);

      yield put({
        type: 'fetchUsers',
      });
    },

    *postUserEdit({ payload }, { call, put }) {
      const response = yield call(queryUserEdit, payload);
      console.log('reponse edit: ', response);

      yield put({
        type: 'fetchUsers',
        // payload: response,
      });
    },

    *postUsersFilter({ payload }, { call, put }) {
      const response = yield call(queryUsersFilter, payload);
      console.log('response filter: ', response);

      yield put({
        type: 'filter',
        payload: response,
      });
    },

    *fetchUsersSearch({ payload }, { call, put }) {
      const response = yield call(queryUserSearch, payload);
      console.log('response search', response);

      if (payload.length === 0) {
        yield put({
          type: 'fetchUsers',
        });
        return;
      }
      yield put({
        type: 'search',
        payload: response,
      });
    },

    *postUserActive({ payload }, { call, put }) {
      const response = yield call(queryUserActive, payload);
      console.log('response status', response);

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
      return {
        ...state,
        users: [...state.users, payload],
      };
    },
    delete(state, action) {
      console.log('action', action.payload);
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
      };
    },
    edit(state, action) {
      console.log('action', action.payload);
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id !== action.payload.id) return user;
          return {
            ...user,
            ...action.payload,
          };
        }),
      };
    },
    filter(state, action) {
      console.log('action', action.payload);
      console.log('state', state);

      return {
        ...state,
        users: action.payload,
      };
    },
    search(state, action) {
      console.log('action search', action);
      return {
        ...state,
        users: action.payload,
      };
    },
  },
};

export default HomeModel;
