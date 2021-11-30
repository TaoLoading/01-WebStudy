import React, { Component } from 'react'

export default class Search extends Component {
  render() {
    return (
      <div>
        <input type="text" placeholder="enter the name you search" />&nbsp;<button>Search</button>
      </div>
    )
  }
}