import { createAction, handleActions } from 'redux-actions';

// 액션 타입
const INCREASE = 'couter/INCREASE';
const DECREASE = 'couter/DECREASE';

// 액션 생섬 함수
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 1초 뒤에 increase 혹은 decrease를 디스패치함
export const increaseAsync = () => dispatch => {
  alert(dispatch);
  setTimeout(() => {
    dispatch(increase());
  }, 1000);
};
export const decreaseAsync = () => dispatch => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000);
};

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
