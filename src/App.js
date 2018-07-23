import React, {Component} from 'react';
import Auth from "./Auth/Auth";
import './App.css';
import Intro from "./Intro/Intro";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Workspace from "./Workspace/Workspace";
import Callback from "./Auth/Callback";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
};

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Intro}/>
                        <Route path="/workspace" render={(props) => {
                            return <Workspace auth={auth} {...props}/>
                        }}/>
                        <Route path="/callback" render={(props) => {
                            handleAuthentication(props);
                            return <Callback {...props}/>
                        }}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
