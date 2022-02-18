import React, { PureComponent } from 'react';
import Addition from './pages/addition-抽离代码'
import Subtraction from './pages/subtraction-抽离代码'

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