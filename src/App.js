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
                            onClick={this.saveToFile.bind(this)}
                        >Save
                        </button>
                        <button
                            className={"btn btn-primary App-load-btn" + (!this.state.minimized ? " App-hidden" : "")}
                            onClick={this.showFileInputDialog.bind(this)}
                        >
                            <input ref={this.fileInput}
                                   type={"file"}
                                   className={"App-hidden"}
                                   onChange={this.loadFromFile.bind(this)}
                            />
                            Load
                        </button>
                        <PresetSelector ref={this.presetSelector} onChange={this.loadPreset.bind(this, true)}/>
                    </div>
                </header>
                <p className={this.state.minimized ? " App-hidden" : "App-intro"}>
                    This application is designed to help with trade when playing Mount & Blade: Warband.
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
        let files = this.fileInput.current.files;

        if (files.length > 0) {
            let loadedState = [];
            let fr = new FileReader();
            fr.onload = () => {
                loadedState = JSON.parse(fr.result);
                this.loadPreset(false, loadedState);
            };
            fr.readAsText(files[0]);
        }
    }

    updateTableState(state) {
        this.setState({tableState: state})
    }

    loadPreset(isLoadedFromPreset, preset) {
        let stateFromPreset = {...preset};
        if (isLoadedFromPreset) {
            let newPrices = [];
            stateFromPreset.products.forEach(product => {
                    stateFromPreset.cities.forEach(city => newPrices.push(
                        {key: city + "-" + product, buy: Number.MAX_SAFE_INTEGER, sell: 0})
                    );
                }
            );
            stateFromPreset.prices = newPrices;
        }
        this.table.current.setState(stateFromPreset);
    }

}

export default App;
