import { createAction, handleActions } from 'redux-actions';
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

// 액션 타입
const INCREASE = 'couter/INCREASE';
const DECREASE = 'couter/DECREASE';

const INCREASE_ASYNC = 'couter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'couter/DECREASE_ASYNC';

// 액션 생섬 함수
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 마우스 클릭 이벤트가 payload 안에 들어가지 않도록
// () => undefind를 두번째 파라미터로 넣어준다.
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
  yield delay(1000); // 1초를 기다린다.
  yield put(increase());
}

function* decreaseSaga() {
  yield delay(1000); // 1초를 기다린다.
  yield put(decrease());
}

export function* counterSaga() {
  //takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리해 준다.
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  // takeLatest는 기존에 진행 중이던 작업이 있다면 취소처리하고
  // 가장 마지막으로 실행되는 작업만 수행한다.
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

// 상태는 꼭 객체일 필요 없다.
const initialState = 0;

// 리듀서 작성
const counter = handleActions(
  {
    [INCREASE]: state => state + 1,
    [DECREASE]: state => state - 1,
  },
  initialState,
);

export default counter;
