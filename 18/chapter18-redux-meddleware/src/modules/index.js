import { combineReducers } from 'redux';
import counter from './counter';
import sample from './sample';
import loading from './loading';

export default combineReducers({
  counter,
  sample,
  loading,
});
