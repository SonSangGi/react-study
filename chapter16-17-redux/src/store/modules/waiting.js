import { createAction, handleActions } from 'redux-actions';

const CHANGE_INPUT = 'waiting/CHANGE_INPUT'; // 값 변경
const CREATE = 'waiting/CREATE'; // 이름 추가
const ENTER = 'waiting/ENTER'; // 입장
const LEAVE = 'waiting/LEAVE'; // 나감

/*
export changeInput = text => ({type:CHANGE_INPUT,payload:text});
export create = text => ({type:CREATE,payload:text});
export enter = id => ({type:ENTER,payload:id});
export leave = id => ({type:LEAVE,payload:id});
*/

let id = 3;
// createAction으로 액션 생성함수 정의
export const changeInput = createAction(CHANGE_INPUT, text => text);
export const create = createAction(CREATE, text => ({ text, id: id++ }));
export const enter = createAction(ENTER, id => id);
export const leave = createAction(LEAVE, id => id);

// 초기상태 정의
const initialState = {
  input: '',
  list: [
    { id: 0, name: '홍길동', entered: true },
    { id: 1, name: '이순신', entered: false },
    { id: 2, name: '강감찬', entered: false },
  ],
};

// handleActions 사용 시 swich/case 문을 사용할 필요가 없다.
export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      input: action.payload,
    }),
    [CREATE]: (state, action) => ({
      ...state,
      list: state.list.concat({
        id: action.payload.id,
        name: action.payload.text,
        entered: false,
      }),
    }),
    [ENTER]: (state, action) => ({
      ...state,
      list: state.list.map(item =>
        item.id === action.payload ? { ...item, entered: !item.entered } : item,
      ),
    }),
    [LEAVE]: (state, action) => ({
      ...state,
      list: state.list.filter(item => item.id !== action.payload),
    }),
  },
  initialState,
);
