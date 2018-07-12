import React, {Component} from 'react';
import logo from './icon.png';
import './App.css';
import Table from "./Table/Table";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {minimized: false};
    }

    minimize = () => {
        this.setState({minimized: true});
    };

    render() {
        return (
            <div className="App col">
                <header className={(this.state.minimized ? "App-header-small" : "App-header ")}>
                    <img src={logo} className={this.state.minimized ? "App-logo-small" : "App-logo"} alt="logo"/>
                    <h1 className="App-title">Mount & Blade Trade Helper</h1>
                </header>
                <p className={this.state.minimized ? " App-hidden" : "App-intro"}>
                    This application is designed to help with trade when playing Mount & Blade: Warband.
                </p>
                <button className={this.state.minimized ? " App-hidden" : "btn"}
                        onClick={this.minimize}>Get started!
                </button>
                    {this.state.minimized ? <Table/> : ""}
            </div>
        );
    }
}

export default App;
