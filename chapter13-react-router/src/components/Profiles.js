import React from "react";
import { Route, NavLink } from "react-router-dom";
import Profile from "./Profile";

// NavLink : Link와 비슷, 현재 경로와 Link에서 사용하는 경로가 일치하는 경우 스타일 혹은 CSS 클래스를 적용할 수 있다.

const Profiles = () => {
  const activeStyle = {
    background: "black",
    color: "white"
  };
  return (
    <div>
      <h3>사용자 목록:</h3>
      <ul>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/sanggi" active>
            sanggi
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/hyunho">
            hyunho
          </NavLink>
        </li>
      </ul>

      <Route
        path="/profiles"
        exact
        render={() => <div>사용자를 선택해 주세요.</div>}
      />
      <Route path="/profiles/:username" component={Profile} />
    </div>
  );
};

export default Profiles;
