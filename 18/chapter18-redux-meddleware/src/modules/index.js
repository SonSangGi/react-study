import { combineReducers } from 'redux';
//import counter from './counter'; // redux-thunk
import counter, { counterSaga } from './couter-saga'; // redux-saga
//import sample from './sample';
import sample, { sampleSaga } from './sample-saga';
import loading from './loading';
import { all } from 'redux-saga/effects';

export default combineReducers({
  //  counter,
  counter,
  sample,
  loading,
});

export function* rootSaga() {
  //all 함수는 여러 사가를 합쳐 주는 역할을 한다.
  yield all([counterSaga(), sampleSaga()]);
}
