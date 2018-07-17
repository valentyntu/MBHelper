import React, {Component} from 'react';
import logo from './icon.png';
import './App.css';
import Table from "./Table/Table";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {minimized: true};
        this.tableState = [];
        this.fileInput = React.createRef();
    }

    minimize = () => {
        this.setState({minimized: true});
    };

    render() {
        return (
            <div className="App">
                <header className={(this.state.minimized ? "App-header-small" : "App-header ")}>
                    <img src={logo} className={this.state.minimized ? "App-logo-small" : " App-logo"} alt="logo"/>
                    <h1 className="App-title">Mount & Blade Trade Helper</h1>
                    <div className={"App-save-load-controls"}>
                        <button
                            className={"btn btn-success App-save-btn" + (!this.state.minimized ? " App-hidden" : "")}
                            onClick={this.save.bind(this)}
                        >Save
                        </button>
                        <button
                            className={"btn btn-primary App-load-btn" + (!this.state.minimized ? " App-hidden" : "")}>
                            <input ref={this.fileInput} type={"file"} className={"App-hidden"}/>
                            Load
                        </button>
                    </div>
                </header>
                <p className={this.state.minimized ? " App-hidden" : "App-intro"}>
                    This application is designed to help with trade when playing Mount & Blade: Warband.
                </p>
                <button className={this.state.minimized ? " App-hidden" : "btn"}
                        onClick={this.minimize}>Get started!
                </button>
                {this.state.minimized ? <Table ref={this.table} onChange={this.updateTableState.bind(this)}/> : ""}
            </div>
        );
    }

    save() {
        let blob = new Blob([JSON.stringify(this.state.tableState)], {type: 'text/plain'});
        let anchor = document.createElement('a');

        anchor.download = "mb_helper.json";
        anchor.href = (window.URL).createObjectURL(blob);
        anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
        anchor.click();
    }

    showFileInputDialog(){

    }

    load(){

    }

    updateTableState(state) {
        this.setState({tableState: state})
    }

}


export default App;
