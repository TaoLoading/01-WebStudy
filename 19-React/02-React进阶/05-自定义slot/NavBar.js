import React, { Component } from 'react'

class NavBar extends Component {
  render() {
    return (
      <div className='navBar'>
        <div className='navLeft'>
          {this.props.children[0]}
        </div>
        <div className='navItem navCenter'>
          {this.props.children[1]}
        </div>
        <div className='navItem navRight'>
          {this.props.children[2]}
        </div>
      </div>
    );
  }
}

export default NavBar;