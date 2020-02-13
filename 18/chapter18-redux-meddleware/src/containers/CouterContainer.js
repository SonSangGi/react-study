import React from 'react';
import { connect } from 'react-redux';
import {
  increase,
  decrease,
  increaseAsync,
  decreaseAsync,
} from '../modules/counter';
import Counter from '../components/Couter';

const CouterContainer = ({
  number,
  increase,
  decrease,
  increaseAsync,
  decreaseAsync,
}) => (
  <Counter
    number={number}
    onIncrease={increase}
    onDecrease={decrease}
    onIncreaseAsync={increaseAsync}
    onDecreaseAsync={decreaseAsync}
  />
);

export default connect(
  state => ({
    number: state.counter,
  }),
  {
    increase,
    decrease,
    increaseAsync,
    decreaseAsync,
  },
)(CouterContainer);
