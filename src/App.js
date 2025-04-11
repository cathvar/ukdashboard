import React from 'react';
import DebtClock from './components/DebtClock';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="title">UK National Debt Clock</h1>
      <DebtClock />
    </div>
  );
}

export default App;
