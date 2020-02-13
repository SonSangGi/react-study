import { handleActions } from 'redux-actions';
import * as api from '../lib/api';

// 액션 타입을 선언한다.
// 한 요청당 세개를 만들어야 한다.

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

// thunk 함수를 생성한다.
// thunk 함수 내부에서는 시작할 때, 성공했을 때, 실패했을 때 다른 액션을 디스패치한다.
export const getPost = id => async dispatch => {
  dispatch({ type: GET_POST }); // 요청을 시작한 것을 알림
  try {
    const response = await api.getPost(id);
    dispatch({ type: GET_POST_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: GET_POST_FAILURE, payload: e, error: true });
    throw e; // 나중에 컴포넌트 단에서 에러를 조회할 수 있게 해 줌
  }
};
export const getUsers = id => async dispatch => {
  dispatch({ type: GET_USERS }); // 요청을 시작한 것을 알림
  try {
    const response = await api.getUsers();
    dispatch({ type: GET_USERS_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: GET_USERS_FAILURE, payload: e, error: true });
    throw e; // 나중에 컴포넌트 단에서 에러를 조회할 수 있게 해 줌
  }
};

// 초기 상태를 선언
// 요청 로딩 증 싱태는 loading이라는 객체에서 관리
const initialState = {
  loading: {
    GET_POST: false,
    GET_USERS: false,
  },
  post: null,
  users: null,
};

// 리듀서 작성
const sample = handleActions(
  {
    [GET_POST]: state => ({
      ...state,
      loading: {
        GET_POST: true,
      },
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        GET_POST: false,
      },
      post: action.payload,
    }),
    [GET_POST_FAILURE]: state => ({
      ...state,
      loading: {
        GET_POST: false,
      },
    }),
    [GET_USERS]: state => ({
      ...state,
      loading: {
        GET_USERS: true,
      },
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        GET_USERS: false,
      },
      users: action.payload,
    }),
    [GET_USERS_FAILURE]: state => ({
      ...state,
      loading: {
        GET_USERS: false,
      },
    }),
  },
  initialState,
);

export default sample;
