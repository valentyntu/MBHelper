import React, {Component} from 'react';
import "./CloudLoader.css"
import savesURL from "../savesURL"

class CloudLoader extends Component {
    render() {
        return (
            <button
                className={"btn btn-primary upload-btn btn-block"}
            >Download
                <i className="fas fa-cloud-download-alt ml-2"/>
            </button>
        )
    }

    componentDidMount() {
    }

    loadCurrentUsersSaves() {
        if (this.props.auth.isAuthenticated()) {
            return this.props.auth.getUserInfo()
                .then(info =>
                    fetch(`${savesURL}?sub=${info.sub}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    )).then(saves => saves.json());
        } else return [];
    }
}

export default CloudLoader;