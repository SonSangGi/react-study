import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as waitingActions from '../store/modules/waiting';
import WaitingList from '../components/WaitingList';

const WaitingListContainer = props => {
  const { input, WaitingActions, list } = props;

  const handleChange = e => WaitingActions.changeInput(e.target.value);
  const handleEnter = id => WaitingActions.enter(id);
  const handleLeave = id => WaitingActions.leave(id);
  const handleSubmit = e => {
    e.preventDefault();
    WaitingActions.create(input); // 등록
    WaitingActions.changeInput(''); // 인풋 값  초기화
  };

  return (
    <WaitingList
      input={input}
      waitingList={list}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onEnter={handleEnter}
      onLeave={handleLeave}
    />
  );
};

// 컴포넌트에 props 전달
const mapStateToProps = ({ waiting }) => ({
  input: waiting.input,
  list: waiting.list,
});

// 컴포넌트에 actions 전달
// 이런 구조로 할 경우 나중에 다양한 리덕스 모듈을 적용해야 하는 상황에서 유용하다.
const mapDispatchToProps = dispatch => ({
  WaitingActions: bindActionCreators(waitingActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WaitingListContainer);
