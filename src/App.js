import React, { Component } from 'react';
import logo from './assets/img/icon.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Mount & Blade Trade Helper</h1>
        </header>
        <p className="App-intro">
            This application is designed to help with trade when playing Mount & Blade: Warband.
        </p>
      </div>
    );
  }
}

export default App;
