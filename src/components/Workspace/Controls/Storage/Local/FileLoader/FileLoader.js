import React, {Component} from 'react';
import './FileLoader.css'
import connect from 'react-redux/es/connect/connect';
import {loadSaveOrPreset} from '../../../../../../actions/saveActions'

class FileLoader extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.fileInputForm = React.createRef();
  }

  render() {
    return (
        <button
            className={'btn btn-primary load-btn btn-block'}
            onClick={this.showFileInputDialog.bind(this)}>
          <form className={'App-hidden'} ref={this.fileInputForm}>
            <input ref={this.fileInput}
                   type={'file'}
                   accept={'.json'}
                   onChange={this.loadFromFile.bind(this)}
            />
          </form>
          Load
          <i className="fas fa-folder-open ml-2"/>
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
        this.fileInputForm.current.reset();
        this.props.loadSaveOrPreset(loadedState);
      };
      fr.readAsText(file);
    }
  }

  showFileInputDialog() {
    this.fileInput.current.click();
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps, {loadSaveOrPreset})(FileLoader);