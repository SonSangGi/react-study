import React, { Component } from 'react';

class Counter extends Component {
  state = {
    number: 0,
    fixedNumber: 0
  };
  render() {
    // 비구조화 할당으로 쉽게 가져올 수 있다.
    const { number, fixedNumber } = this.state; // state 를 조회 할 때에는 this.state 로 조회한다.
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는 값: {fixedNumber}</h2>
        <button
          // onClick 을 통하여 버튼이 클릭됐을 때 호출 할 함수를 지정한다. 카멜케이스로 작성
          onClick={() => {
            // this.setState(prevState => {
            //   return {
            //     number: prevState.number + 1
            //   };
            // });
            // this.setState(prevState => ({
            //   number: prevState.number + 1
            // }));
            this.setState(
              {
                number: number + 1
              },
              () => {
                console.log('setState 호출');
                console.log(this.state);
              }
            );
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;
