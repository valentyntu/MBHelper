import React, {Component} from 'react';
import logo from './icon.png';
import './App.css';
import Table from "./Table/Table";
import PresetSelector from "./Table/Presets/PresetSelector";
import presets from "./Table/Presets/Presets";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            minimized: true,
            tablePreset: presets[0],
            tableState: []
        };
        this.table = React.createRef();
        this.fileInput = React.createRef();
        this.presetSelector = React.createRef();
        this.fileInputForm = React.createRef();
    }

    minimize = () => {
        this.setState({minimized: true});
    };

    render() {
        return (
            <div className="App">
                <nav
                    className={"navbar navbar-dark bg-dark navbar-expand-lg" + (!this.state.minimized ? " App-hidden" : "")}>
                    <a className="navbar-brand" href="/">
                        <img src={logo}
                             className="d-inline-block align-top App-logo-small" alt=""/>
                    </a>
                    <span className={"navbar-brand"}>Mount & Blade Trade Helper</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">

                            </li>
                            <li className="nav-item">

                            </li>

                        </ul>
                        <div className={"App-controls-container"}>
                            <PresetSelector ref={this.presetSelector} onChange={this.load.bind(this)}/>
                            <button
                                className={"btn btn-success App-save-btn"}
                                onClick={this.saveToFile.bind(this)}
                            >Save
                            </button>
                            <button
                                className={"btn btn-primary App-load-btn"}
                                onClick={this.showFileInputDialog.bind(this)}>
                                <form className={"App-hidden"} ref={this.fileInputForm}>
                                <input ref={this.fileInput}
                                       type={"file"}
                                       accept={".json"}
                                       onChange={this.loadFromFile.bind(this)}
                                />
                                </form>
                                Load
                            </button>
                        </div>
                    </div>
                </nav>

                <header className={(this.state.minimized ? "App-hidden" : "App-header ")}>
                    <img src={logo} className={"App-logo"} alt="logo"/>
                    <h1 className="App-title">Mount & Blade Trade Helper</h1>
                </header>
                <p className={this.state.minimized ? " App-hidden" : "App-intro"}>
                    This application is designed to help with trade when playing Mount & Blade.
                </p>
                <button className={this.state.minimized ? " App-hidden" : "btn"}
                        onClick={this.minimize}>Get started!
                </button>
                {this.state.minimized ? <Table
                    preset={this.state.tablePreset}
                    ref={this.table}
                    onChange={this.updateTableState.bind(this)}/> : ""}
            </div>
        );
    }

    saveToFile() {
        let blob = new Blob([JSON.stringify(this.state.tableState)], {type: 'application/json'});
        let anchor = document.createElement('a');

        anchor.download = "mb_helper.json";
        anchor.href = (window.URL).createObjectURL(blob);
        anchor.dataset.downloadurl = ['application/json', anchor.download, anchor.href].join(':');
        anchor.click();
    }

    showFileInputDialog() {
        this.fileInput.current.click();
    }

    loadFromFile() {
        let file = this.fileInput.current.files[0];
        if (file !== undefined) {
            let loadedState = [];
            let fr = new FileReader();
            fr.onload = () => {
                loadedState = JSON.parse(fr.result);
                this.load(loadedState);
                this.fileInputForm.current.reset();
            };
            fr.readAsText(file);
        }
    }

    updateTableState(state) {
        this.setState({tableState: state})
    }

    load(saveOrPreset) {
        let newTableState = {...saveOrPreset};
        if (newTableState.prices === undefined) {
            let newPrices = [];
            newTableState.products.forEach(product => {
                    newTableState.cities.forEach(city => newPrices.push(
                        {key: city + "-" + product, buy: Number.MAX_SAFE_INTEGER, sell: 0})
                    );
                }
            );
            newTableState.prices = newPrices;
        }
        this.table.current.setState(newTableState);
    }

}

export default App;
