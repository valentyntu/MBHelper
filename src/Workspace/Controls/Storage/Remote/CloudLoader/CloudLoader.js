import React, {Component} from 'react';
import "./CloudLoader.css";
import savesURL from "../savesURL";
import axios from 'axios';

class CloudLoader extends Component {
    render() {
        return (
            <button
                onClick={this.loadCurrentUsersSaves.bind(this)}
                className={"btn btn-primary upload-btn btn-block"}
            >Download
                <i className="fas fa-cloud-download-alt ml-2"/>
            </button>
        )
    }

    componentDidMount() {
    }

    componentWillMount() {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("id_token");
    }

    loadCurrentUsersSaves() {
        if (this.props.auth.isAuthenticated()) {
            return this.props.auth.getUserInfo()
                .then(info =>
                    axios.get(`${savesURL}?sub=${info.sub}`))
                .then(saves => this.props.onChange(saves.data))
                .catch(err => console.error(err));
        } else this.props.onChange([]);
    }
}

export default CloudLoader;