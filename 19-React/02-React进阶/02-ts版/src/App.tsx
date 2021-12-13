import React from 'react';
import robots from './mockdata/robots.json'
import Robot from "./components/Robot";
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.robotList}>
        {robots.map((r) => {
          return <Robot key={r.id} id={r.id} name={r.name} email={r.email}></Robot>
        })}
      </div>
    </div>
  );
}

export default App;
