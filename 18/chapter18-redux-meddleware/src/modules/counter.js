import { createAction, handleActions } from 'redux-actions';

// 액션 타입
const INCREASE = 'couter/INCREASE';
const DECREASE = 'couter/DECREASE';

// 액션 생섬 함수
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 상태는 꼭 객체일 필요 없다.
const initialState = 0;

const couter = handleActions(
  {
    [INCREASE]: state => state + 1,
    [DECREASE]: state => state - 1,
  },
  initialState,
);

export default couter;
