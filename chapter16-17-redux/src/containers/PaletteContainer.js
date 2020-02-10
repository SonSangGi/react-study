/* 리덕스와 연동해주는 컴포넌트를 컨테이너 컴포넌트라고 부른다.
 * 단순히 props만 전달하는 컴포넌트는 프리젠테이셔널 컴포넌트라고 부른다.
 */

import React from 'react';
import { connect } from 'react-redux';
import { changeColor } from '../store/modules/counter';
import Palette from '../components/Palette';

const PaletteContainer = props => {
  const handleSelect = color => {
    console.log(color);
    const { changeColor } = props;
    changeColor(color);
  };

  return <Palette onSelect={handleSelect} selected={props.color} />;
};

const mapStateToProps = state => ({
  color: state.counter.color,
});

const mapDispatchToProps = dispatch => ({
  changeColor: color => dispatch(changeColor(color)),
});

/**
 * 컨테이너 컴포넌트를 만들땐 react-redux의 connect 함수를 사용한다.
 * 함수의 파라미터에 전달해주는 mapStateToProps는 스토어 안에 들어있는 값을 props로 전달해주고,
 * mapDispatchToProps는 액션 함수들을 props로 전달해준다.
 */

export default connect(mapStateToProps, mapDispatchToProps)(PaletteContainer);
