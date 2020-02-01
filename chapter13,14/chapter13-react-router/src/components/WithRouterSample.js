import React from "react";
import { withRouter } from "react-router-dom";

// withRouter : 라우트로 사용된 컴포넌트가 아니어도 location, match, history를 사용할 수 있음

const WithRouterSample = ({ location, match, history }) => {
  return (
    <div>
      <h4>location</h4>
      <textarea
        value={JSON.stringify(location, null, 2)}
        rows={7}
        readOnly={true}
      />
      <h4>match</h4>
      <textarea
        value={JSON.stringify(match, null, 2)}
        rows={7}
        readOnly={true}
      />
      <h4>history</h4>
      <textarea
        value={JSON.stringify(history, null, 2)}
        rows={7}
        readOnly={true}
      />
      <button onClick={() => history.push("/")}>홈으로</button>
    </div>
  );
};

export default withRouter(WithRouterSample);
