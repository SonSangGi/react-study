import React, { Component, useState, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import loadable from '@loadable/component';
const SplitMe = React.lazy(() => import('./SplitMe'));
const SplitMe2 = loadable(() => import('./SplitMe'), {
  fallback: <div>loaddddding!</div>,
});

const App = () => {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  const onMouseOver = () => {
    SplitMe2.preload(); // 마우스 올릴 경우 불러옴
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick} onMouseOver={onMouseOver}>
          Hello React!
        </p>
        <Suspense fallback={<div>loading...</div>}>
          {visible && <SplitMe />}
        </Suspense>
        {visible && <SplitMe2 />}
      </header>
    </div>
  );
};

export default App;
