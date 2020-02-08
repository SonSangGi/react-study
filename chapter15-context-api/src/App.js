import React from 'react';
import ColorBox from './components/ColorBox';
import SelectColors from './components/SelectColors';
import SelectColors2 from './components/SelectColors2';
import { ColorProvider } from './contexts/color';

const App = () => {
  return (
    <ColorProvider>
      <div>
        <SelectColors />
        <ColorBox />
        <hr />
        <SelectColors2 />
      </div>
    </ColorProvider>
  );
};

export default App;
