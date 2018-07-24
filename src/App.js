import React, {Component} from 'react';
import Auth from "./Auth/Auth";
import './App.css';
import Intro from "./Intro/Intro";
import {Route, Router, Switch} from "react-router-dom";
import Workspace from "./Workspace/Workspace";
import Callback from "./Auth/Callback";
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
};

class App extends Component {

    render() {
        return (
            <Router history={history}>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Intro}/>
                        <Route path="/workspace" render={(props) => {
                            return <Workspace auth={auth} isHelpShown={false} {...props}/>
                        }}/>
                        <Route path="/help" render={(props) => {
                            return <Workspace auth={auth} isHelpShown={true} {...props}/>
                        }}/>
                        <Route path="/callback" render={(props) => {
                            handleAuthentication(props);
                            return <Callback {...props}/>
                        }}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
