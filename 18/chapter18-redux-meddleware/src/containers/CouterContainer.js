import React from 'react';
import Couter from '../components/Couter';
const CouterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

export default CouterContainer;
