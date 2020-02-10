import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Couter from '../components/Counter';
import { increment, decrement } from '../store/modules/counter';

const CouterContainer = props => {
  const { increment, decrement, color, number } = props;

  const handleIncrement = () => {
    increment();
  };
  const handleDecrement = () => {
    decrement();
  };
  return (
    <Couter
      color={color}
      value={number}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
    />
  );
};

// 컴포넌트에 props 전달
const mapStateToProps = ({ counter }) => ({
  color: counter.color,
  number: counter.number,
});

// 컴포넌트에 액션 전달
const mapDispatchToProps = dispatch => ({
  increment: dispatch(increment()),
  decrement: dispatch(decrement()),
});

// bindActionCreators: 액션을 자동으로 생성해준다.
const mapDispatchToProps2 = dispatch =>
  bindActionCreators({ increment, decrement }, dispatch);

// 함수가 아닌 객체 설정 시 자동 bindActionCreators
const mapDispatchToProps3 = { increment, decrement };

export default connect(mapStateToProps, mapDispatchToProps2)(CouterContainer);
