import React, {Component} from 'react';
import PresetSelector from "../Controls/Presets/PresetSelector";
import FileSaver from "../Controls/Storage/Local/FileSaver/FileSaver";
import FileLoader from "../Controls/Storage/Local/FileLoader/FileLoader";
import logo from "../../icon.png"
import "./Navbar.css"
import CloudSaver from "../Controls/Storage/Remote/CloudSaver/CloudSaver";
import CloudLoader from "../Controls/Storage/Remote/CloudLoader/CloudLoader";
import history from "../../history";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        };
        this.presetSelector = React.createRef();
        this.fileSaver = React.createRef();
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        return (
            <nav className={"navbar navbar-dark bg-dark navbar-expand-lg"}>
                <a className="navbar-brand" href="/">
                    <img src={logo}
                         className="d-inline-block align-top App-logo-small" alt=""/>
                </a>
                <a className={"navbar-brand"} href={"/"}>M&B Trade Helper</a>
                <div className={"help-container my-2 mx-lg-2"}>
                    <button className={"btn btn-info btn-block"}
                    onClick={() => history.replace("/help")}
                    >
                        <i className="fas fa-question fa-2x"/>
                    </button>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarToggleableContent" aria-controls="navbarToggleableContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarToggleableContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={"nav-item my-2 my-lg-0 mx-lg-1"}>
                            <PresetSelector ref={this.presetSelector} onChange={this.load.bind(this)}/>
                        </li>
                        <li className={"nav-item my-2 my-lg-0 mx-lg-1"}>
                            <FileSaver ref={this.fileSaver} tableState={this.props.tableState}/>
                        </li>
                        <li className={"nav-item my-2 my-lg-0 mx-lg-1"}>
                            <FileLoader onChange={this.load.bind(this)}/>
                        </li>
                        {
                            isAuthenticated() &&
                            <li className={"nav-item my-2 my-lg-0 mx-lg-1"}>
                                <CloudSaver tableState={this.props.tableState} auth={this.props.auth}/>
                            </li>
                        }
                        {
                            isAuthenticated() &&
                            <li className={"nav-item my-2 my-lg-0 mx-lg-1"}>
                                <CloudLoader auth={this.props.auth}/>
                            </li>
                        }
                    </ul>


                    {
                        !isAuthenticated() &&
                        <div className={"login-container my-2 my-lg-0"}>
                            <button className={"btn btn-success login btn-block"} onClick={this.login.bind(this)}>
                                Log in
                            </button>
                        </div>
                    }
                    {
                        isAuthenticated() &&
                        <div className={"login-container my-2 my-lg-0"}>
                            <span className={"greeting"}>Hi, {this.state.user.nickname}!</span>
                            <button className={"btn btn-success logout btn-block"} onClick={this.logout.bind(this)}>
                                Log out
                            </button>
                        </div>
                    }
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

    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
    }

    componentWillMount() {
        if (this.props.auth.isAuthenticated()) {
            this.props.auth.getUserInfo()
                .then(user => this.setState({user: user}))
                .catch(e => console.log(e))
        }
    }
}

export default Navbar;