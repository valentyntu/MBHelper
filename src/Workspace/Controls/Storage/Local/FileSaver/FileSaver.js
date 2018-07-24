import React, {Component} from 'react';
import "./FileSaver.css"

class FileSaver extends Component {

    render() {
        return (
            <button
                className={"btn btn-success save-btn btn-block"}
                onClick={this.saveToFile.bind(this)}
            >Save
                <i className="fas fa-save ml-2"/>
            </button>
        )
    }

    componentDidMount() {

    }

    saveToFile() {
        let blob = new Blob([JSON.stringify(this.props.tableState)], {type: 'application/json'});
        let anchor = document.createElement('a');

        anchor.download = "mb_helper.json";
        anchor.href = (window.URL).createObjectURL(blob);
        anchor.dataset.downloadurl = ['application/json', anchor.download, anchor.href].join(':');
        anchor.click();
    }
}

export default FileSaver;