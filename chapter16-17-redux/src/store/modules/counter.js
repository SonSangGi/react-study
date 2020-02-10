// 액션 타입 정의
const CHANGE_COLOR = 'couter/CHANGE_COLOR';
const INCREMENT = 'couter/INCREMENT';
const DECREMENT = 'couter/DECREMENT';

// Ducks 패턴으로 작성할 때 다른 모듈에서의 같은 이름으로 충돌되지 않게 모듈 이름을 넣는다.
// * Ducks 패턴 : 액션과 리듀서를 각각 파일로 분리하지 않고 하나의 파일로 작성하는 방식

// 액션 생성 함수 정의
export const changeColor = color => ({ type: CHANGE_COLOR, color });
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

// 초기 상태 정의
const initialState = {
  color: 'black',
  number: 0,
};

// 리듀서 작성
export default function couter(state = initialState, action) {
  console.log(state);
  switch (action.type) {
    case CHANGE_COLOR:
      return {
        ...state,
        color: action.color,
      };
    case INCREMENT:
      return {
        ...state,
        number: state.number + 1,
      };
    case DECREMENT:
      return {
        ...state,
        number: state.number - 1,
      };
    default:
      return state;
  }
}
