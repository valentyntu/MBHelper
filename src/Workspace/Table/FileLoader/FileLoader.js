import React, {Component} from 'react';
import './FileLoader.css'

class FileLoader extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.fileInputForm = React.createRef();
    }

    render() {
        return (
            <button
                className={"btn btn-primary load-btn"}
                onClick={this.showFileInputDialog.bind(this)}>
                <form className={"App-hidden"} ref={this.fileInputForm}>
                    <input ref={this.fileInput}
                           type={"file"}
                           accept={".json"}
                           onChange={this.loadFromFile.bind(this)}
                    />
                </form>
                Load
            </button>
        )
    }

    componentDidMount() {

    }

    loadFromFile() {
        let file = this.fileInput.current.files[0];
        if (file !== undefined) {
            let loadedState = [];
            let fr = new FileReader();
            fr.onload = () => {
                loadedState = JSON.parse(fr.result);
                this.props.onChange(loadedState);
                this.fileInputForm.current.reset();
            };
            fr.readAsText(file);
        }
    }

    showFileInputDialog() {
        this.fileInput.current.click();
    }
}

export default FileLoader;