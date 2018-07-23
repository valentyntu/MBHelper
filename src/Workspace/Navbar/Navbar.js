import React, {Component} from 'react';
import PresetSelector from "../Table/Presets/PresetSelector";
import FileSaver from "../Table/FileSaver/FileSaver";
import FileLoader from "../Table/FileLoader/FileLoader";
import logo from "../../icon.png"
import "./Navbar.css"

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
                <a className={"navbar-brand"} href={"/"}>Mount & Blade Trade Helper</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <PresetSelector ref={this.presetSelector} onChange={this.load.bind(this)}/>
                        </li>
                        <li className="nav-item">
                            <FileSaver ref={this.fileSaver} tableState={this.props.tableState}/>
                        </li>
                        <li className={"nav-item"}>
                            <FileLoader onChange={this.load.bind(this)}/>
                        </li>
                    </ul>
                    {
                        !isAuthenticated() &&
                        <div>
                            <button className={"btn btn-success login"} onClick={this.login.bind(this)}>
                                Log in
                            </button>
                        </div>
                    }
                    {
                        isAuthenticated() &&
                        <div className={"login-container"}>
                            <span className={"greeting"}>Hi, {this.state.user.nickname}!</span>
                            <button className={"btn btn-success logout"} onClick={this.logout.bind(this)}>
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
        this.setState({isAuthenticated: false});
    }


    componentWillMount() {
        this.props.auth.getUserInfo()
            .then(user => this.setState({user: user}))
            .catch(e => console.log(e))
    }
}

export default Navbar;