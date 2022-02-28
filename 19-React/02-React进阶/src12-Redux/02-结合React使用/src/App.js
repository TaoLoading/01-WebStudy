import React, { PureComponent } from 'react';
import Addition from './pages/07-addition-redux-saga'
import Subtraction from './pages/06-subtraction-redux-thunk'

class App extends PureComponent {
  render() {
    return (
      <div>
        <Addition />
        <Subtraction />
      </div>
    );
  }
}

export default App;