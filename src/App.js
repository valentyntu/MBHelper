import React, {Component} from 'react';
import Auth from "./Auth/Auth";
import './App.css';
import Intro from "./Intro/Intro";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Workspace from "./Workspace/Workspace";
import history from "./history";
import Callback from "./Callback/Callback";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        handleAuthentication();
    }
};

class App extends Component {

    constructor(props) {
        super(props);
    }

    goTo(route) {
        history.replace(`/${route}`)
    }

    login() {
        auth.login();
    }

    logout() {
        auth.logout();
    }

    render() {
        return (
            <BrowserRouter history={history}>
                <div className="App">
                    <button className={"btn btn-success"} onClick={this.login.bind(this)}>Auth</button>
                    <Switch>
                        <Route exact path="/" component={Intro}/>
                        <Route path="/workspace" auth={auth} component={Workspace}/>
                        <Route path="/callback" render={(props) => {
                            handleAuthentication(props);
                            return <Callback {...props} />
                        }}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
