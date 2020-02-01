import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Profiles from "./components/Profiles";
import HistorySample from "./components/HistorySample";
import HistorySample2 from "./components/HistorySample2";
import WithRouterSample from "./components/WithRouterSample";

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필</Link>
        </li>
        <li>
          <Link to="/history">History 예제</Link>
        </li>
        <li>
          <Link to="/history2">History 예제2</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" component={Home} exact={true} />
      <Route path={["/about", "/info"]} component={About} />
      <Route path="/profiles" component={Profiles} />
      <Route path="/history" component={HistorySample} />
      <Route path="/history2" component={HistorySample2} />
    </div>
  );
};

export default App;
