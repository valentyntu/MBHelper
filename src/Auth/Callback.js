import React, {Component} from 'react';
import loading from '../assets/loading.svg'
import './Callback.css'

class Callback extends Component {

  render() {
    return (
        <div className={'Callback-container'}>
          <h1>Please, wait!</h1>
          <img className={'Callback-image'} src={loading} alt="loading"/>
        </div>
    );
  }

}

export default Callback;