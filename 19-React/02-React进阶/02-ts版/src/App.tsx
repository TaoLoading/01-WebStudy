import React from 'react';
import logo from "./assets/images/logo.svg";
import robots from './mockdata/robots.json'
import Robot from "./components/Robot";
import ShoppingCart from "./components/ShoppingCart";
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <h1>罗伯特机器人</h1>
      </div>
      <ShoppingCart />
      <div className={styles.robotList}>
        {robots.map((r) => {
          return <Robot key={r.id} id={r.id} name={r.name} email={r.email}></Robot>
        })}
      </div>
    </div>
  );
}

export default App;
