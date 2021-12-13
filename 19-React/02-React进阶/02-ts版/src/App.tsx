import React, { Component } from 'react'

import logo from "./assets/images/logo.svg";
import robots from './mockdata/robots.json'
import Robot from "./components/Robot";
import ShoppingCart from "./components/ShoppingCart";
import styles from './App.module.css'

interface Props { }

interface State {
  robotGallery: any[]
}

export default class App extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      robotGallery: []
    }
  }


  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => this.setState({ robotGallery: data }))
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <img src={logo} className={styles.appLogo} alt="logo" />
          <h1>罗伯特机器人</h1>
        </div>
        <ShoppingCart />
        <div className={styles.robotList}>
          {this.state.robotGallery.map((r) => {
            return <Robot key={r.id} id={r.id} name={r.name} email={r.email}></Robot>
          })}
        </div>
      </div>
    )
  }
}
