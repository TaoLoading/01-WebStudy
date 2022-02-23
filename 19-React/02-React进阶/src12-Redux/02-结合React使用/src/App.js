import React, { PureComponent } from 'react';
import Addition from './pages/04-addition-react-redux'
import Subtraction from './pages/04-subtraction-react-redux'

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