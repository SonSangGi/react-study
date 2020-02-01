import React, { useEffect, useState } from "react";

// hook으로는 어떻게 해야되지..

const HistorySample = ({ history }) => {
  const [unblock, setUnblock] = useState(true);

  useEffect(() => {
    //if (unblock) history.block("정말 떠나실 건가요?");

    console.log(history);
    return () => {
      setUnblock(!unblock);
      console.log("bye..");
    };
  }, []);

  return (
    <div>
      <button onClick={() => history.goBack()}>뒤로</button>
      <button onClick={() => history.push("/")}>홈으로</button>
    </div>
  );
};

export default HistorySample;
