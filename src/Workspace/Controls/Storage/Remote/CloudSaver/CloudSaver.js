import React, {Component} from 'react';
import "./CloudSaver.css";

class CloudSaver extends Component {
    render() {
        return (
            <button
                className={"btn btn-success upload-btn btn-block"}
                onClick={this.openSaveModal.bind(this)}
            >Upload
                <i className="fas fa-cloud-upload-alt ml-2"/>
            </button>
        )
    }

    componentDidMount() {

    }

    openSaveModal() {
        this.props.modal.current.setState({
            isUploading: true,
            isOpen: true
        })
    }
}

export default CloudSaver;