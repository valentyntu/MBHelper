import React, {Component} from 'react';
import PresetSelector from "../Table/Presets/PresetSelector";
import FileSaver from "../Table/FileSaver/FileSaver";
import FileLoader from "../Table/FileLoader/FileLoader";
import logo from "../../icon.png"
import "./Navbar.css"

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.presetSelector = React.createRef();
        this.fileSaver = React.createRef();
    }

    render() {
        return (
            <nav
                className={"navbar navbar-dark bg-dark navbar-expand-lg"}>
                <a className="navbar-brand" href="/">
                    <img src={logo}
                         className="d-inline-block align-top App-logo-small" alt=""/>
                </a>
                <a className={"navbar-brand"} href={"/"}>Mount & Blade Trade Helper</a>
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
                    <div className={"controls-container"}>
                        <PresetSelector ref={this.presetSelector} onChange={this.load.bind(this)}/>
                        <FileSaver ref={this.fileSaver} tableState={this.props.tableState}/>
                        <FileLoader onChange={this.load.bind(this)}/>
                    </div>
                </div>
            </nav>
        )
    }

    load(saveOrPreset) {
        let newTableState = {...saveOrPreset};

        if (newTableState.prices === undefined) {
            newTableState.prices = [];
        }

        if (newTableState.prices.length === 0) {
            newTableState.products.forEach(product => {
                newTableState.cities.forEach(city => newTableState.prices.push(
                    {key: city + "-" + product, buy: Number.MAX_SAFE_INTEGER, sell: 0})
                )
            });
        }
        this.props.onUpdate(newTableState);
    }
}

export default Navbar;