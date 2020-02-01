import React from "react";
import { withRouter } from "react-router-dom";

const WithRouterSample = ({ location, match, history }) => {
  return (
    <div>
      <h4>{location}</h4>
      <textarea value={JSON.stringify(location, null, 2)} />
    </div>
  );
};

export default WithRouterSample;
