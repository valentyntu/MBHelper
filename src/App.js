import React, {Component} from 'react';
import './App.css';

import {Route, Router, Switch} from 'react-router-dom';
import history from './history';

import Workspace from './components/Workspace/Workspace';
import Callback from './components/Callback/Callback';
import Intro from './components/Intro/Intro';
import { connect } from 'react-redux';
import {handleAuthentication} from './actions/authActions';

class App extends Component {
  render() {
    return (
        <Router history={history}>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Intro}/>
              <Route path="/workspace" render={(props) => {
                return <Workspace isHelpShown={false} {...props}/>
              }}/>
              <Route path="/help" render={(props) => {
                return <Workspace isHelpShown={true} {...props}/>
              }}/>
              <Route path="/callback" render={(props) => {
                this.props.handleAuthentication(props);
                return <Callback {...props}/>
              }}/>
            </Switch>
          </div>
        </Router>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {handleAuthentication})(App);
