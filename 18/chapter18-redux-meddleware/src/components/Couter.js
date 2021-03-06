import React from 'react';

// Container에서 전달 받을 값
const Couter = ({
  onIncrease,
  onDecrease,
  onIncreaseAsync,
  onDecreaseAsync,
  number,
}) => {
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <br />
      <button onClick={onIncreaseAsync}>async +1</button>
      <button onClick={onDecreaseAsync}>async -1</button>
    </div>
  );
};

export default Couter;
