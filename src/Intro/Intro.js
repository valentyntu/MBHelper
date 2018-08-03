import React, {Component} from 'react';
import './Intro.css';
import logo from '../icon.png';
import history from '../history';

class Intro extends Component {

  render() {
    return (
        <div className={'Intro'}>
          <header className={'App-header'}>
            <img src={logo} className={'App-logo'} alt="logo"/>
            <h1 className="App-title">Mount & Blade Trade Helper</h1>
          </header>
          <p className={'App-intro'}>
            This application is designed to help with trade when playing Mount & Blade.
          </p>
          <a className={'btn btn-secondary btn-fixed'} onClick={e => {
            e.preventDefault();
            history.replace('/workspace');
          }} href={'/workspace'}>
            Get started!
          </a>
        </div>
    )
  }

}

export default Intro;