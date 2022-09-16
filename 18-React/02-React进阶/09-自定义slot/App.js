import React, { Component } from 'react'
import NavBar from './NavBar'
import NavBar2 from './NavBar2'

class App extends Component {
  render() {
    return (
      <div>
        {/* slot1，缺点：无法打乱顺序，当未全传入值时则为undefined */}
        <NavBar name="" title="" className="">
          <span>aaa</span>
          <strong>bbb</strong>
          <a href="/#">ccc</a>
        </NavBar>

        {/* slot2 */}
        <NavBar2 leftSlot={<span>aaa2</span>} centerSlot={<strong>bbb2</strong>} rightSlot={<a href="/#">ccc2</a>} />
      </div>
    );
  }
}

export default App;