import React from 'react';
import { connect } from 'react-redux';
import { increase, decrease } from '../modules/counter';
import Counter from '../components/Couter';

const CouterContainer = ({ number, increase, decrease }) => (
  <Counter number={number} onIncrease={increase} onDecrease={decrease} />
);

export default connect(
  state => ({
    number: state.counter,
  }),
  {
    increase,
    decrease,
  },
)(CouterContainer);
