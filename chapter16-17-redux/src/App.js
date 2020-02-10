import React, { Component } from 'react';

import WaitingList from './components/WaitingList';
import PaletteContainer from './containers/PaletteContainer';
import CouterContainer from './containers/CouterContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PaletteContainer />
        <CouterContainer />
        <WaitingList />
      </div>
    );
  }
}

export default App;
