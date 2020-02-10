import React, { Component } from 'react';

import WaitingListContainer from './containers/WaitingListContainer';
import PaletteContainer from './containers/PaletteContainer';
import CouterContainer from './containers/CouterContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PaletteContainer />
        <CouterContainer />
        <WaitingListContainer />
      </div>
    );
  }
}

export default App;
