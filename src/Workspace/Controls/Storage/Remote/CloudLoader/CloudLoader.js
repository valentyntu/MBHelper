import React, {Component} from 'react';
import "./CloudLoader.css"

const savesURL = "http://localhost:4000/saves";

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
}

export default CloudLoader;