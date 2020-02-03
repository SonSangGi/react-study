import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(0);
  const onClick = async () => {
    // axios.get('https://jsonplaceholder.typicode.com/todos/1').then(response => {
    //   console.log(response);
    //   setData(response.data);
    // });
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1',
      );
      setData(response.data);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && (
        <textarea
          rows={7}
          value={JSON.stringify(data, null, 2)}
          readOnly={true}
        />
      )}
    </div>
  );
};

export default App;
