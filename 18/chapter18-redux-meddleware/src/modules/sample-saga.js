import { handleActions, createAction } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
//import { startLoading, finishLoading } from './loading';
import createRequestSaga from '../lib/createRequestSaga';

// 액션 타입을 선언한다.
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

export const getPost = createAction(GET_POST, id => id);
export const getUsers = createAction(GET_USERS);

const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

/*
function* getPostSaga(action) {
  yield put(startLoading(GET_POST)); // 로딩 시작
  // 파라미터로 action을 받아오면 모든 액션의 정볼르 조회할 수 있다.
  try {
    // call을 사용하면 Promise를 반환하는 함수를 호출하고, 기다릴 수 있다.
    // 첫 번째 파라미터는 함수, 나머지 파라미터는 해당함수에 넣을 인수
    const post = yield call(api.getPost, action.payload); // api.getPost(action.pay-load)를 의미
    yield put({
      type: GET_POST_SUCCESS,
      payload: post.data,
    });
  } catch (e) {
    // try/catch문을 사용하여 에러를 잡을 수 있다.
    yield put({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_POST)); // 로딩 완료
}

function* getUsersSaga(action) {
  yield put(startLoading(GET_USERS)); // 로딩 시작
  try {
    const users = yield call(api.getUsers, action.payload);
    yield put({
      type: GET_USERS_SUCCESS,
      payload: users.data,
    });
  } catch (e) {
    // try/catch문을 사용하여 에러를 잡을 수 있다.
    yield put({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_USERS)); // 로딩 완료
}
*/

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

// 초기 상태를 선언
// 요청 로딩 증 싱태는 loading이라는 객체에서 관리
const initialState = {
  post: null,
  users: null,
};

// 리듀서 작성
const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload,
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
  },
  initialState,
);

export default sample;
