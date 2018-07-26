import React, {Component} from 'react';
import "./CloudLoader.css";

class CloudLoader extends Component {
    render() {
        return (
            <button
                onClick={this.openLoadModal.bind(this)}
                className={"btn btn-primary upload-btn btn-block"}
            >Download
                <i className="fas fa-cloud-download-alt ml-2"/>
            </button>
        )
    }

    openLoadModal() {
        this.props.modal.current.setState({
            isUploading: false,
            isOpen: true
        })
    }

    componentDidMount() {
    }

    componentWillMount() {

    }


}

export default CloudLoader;