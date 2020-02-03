import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Profiles from './components/Profiles';
import HistorySample from './components/HistorySample';
import HistorySample2 from './components/HistorySample2';
import WithRouterSample from './components/WithRouterSample';

// NavLink 사용 시 default path인 "/"는 모든 Link에서 active상태임. 해결 방법은??

const App = () => {
  const activeStyle = {
    background: 'black',
    color: 'white',
  };
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/" active>
            홈
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/about">
            소개
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles">
            프로필
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/history">
            History 예제
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/history2">
            History 예제2
          </NavLink>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path={['/about', '/info']} component={About} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/history" component={HistorySample} />
        <Route path="/history2" component={HistorySample2} />
        <Route
          //path를 따로 정의하지 않으면 모든 상황에 렌더링됨
          render={({ location }) => (
            <div>
              <h2>이 페이지는 존재하지 않습니다.</h2>
              <p>{location.pathname}</p>
            </div>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
