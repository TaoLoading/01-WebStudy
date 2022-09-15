import React, { Component } from 'react'

class NavBar2 extends Component {
  render() {
    const { leftSlot, centerSlot, rightSlot } = this.props

    return (
      <div className='navBar'>
        <div className="navLeft">
          {leftSlot}
        </div>
        <div className="navItem navCenter">
          {centerSlot}
        </div>
        <div className="navItem navRight">
          {rightSlot}
        </div>
      </div>
    );
  }
}

export default NavBar2;