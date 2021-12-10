import React from 'react';
import './App.css';
import robots from './mockdata/robots.json'
import Robot from "./components/Robot/index";

function App() {
  return (
    <ul>
      {robots.map((r) => {
        return <Robot key={r.id} id={r.id} name={r.name} email={r.email}></Robot>
      })}
    </ul>
  );
}

export default App;
