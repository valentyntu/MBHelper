import React, {Component} from 'react';
import "./CloudSaver.css"

const savesURL = "http://localhost:4000/saves";

class CloudSaver extends Component {
    render() {
        return (
            <button
                className={"btn btn-success upload-btn btn-block"}
                onClick={this.uploadSave.bind(this)}
            >Upload
                <i className="fas fa-cloud-upload-alt ml-2"/>
            </button>
        )
    }

    componentDidMount() {

    }

    uploadSave() {
        let save = {...this.props.tableState};
        this.props.auth.getUserInfo()
            .then(userInfo => {
                save.sub = userInfo.sub;
                console.log(JSON.stringify(save));
                return fetch(savesURL, {
                    method: 'POST',
                    body: JSON.stringify(save),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            })
    }
}

export default CloudSaver;