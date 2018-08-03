import React, {Component} from 'react';
import './PresetSelector.css'
import axios from 'axios';
import connect from 'react-redux/es/connect/connect';
import {loadSaveOrPreset} from '../../../actions/saveActions';

const PRESETS_URL = 'https://mb-helper.herokuapp.com/api/presets';

class PresetSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presets: []
    };
    this.select = React.createRef();
  }

  render() {
    return (
        <div className='PresetSelector-container'>
          <button className={'selector-load-btn btn btn-primary'}
                  onClick={() => this.props.loadSaveOrPreset(this.state.presets[this.select.current.value])}
          >Load Preset
          </button>
          <select ref={this.select}
                  className={'custom-select custom-select-lg ml-2 PresetSelector-select'}>
            {this.state.presets.map(item => {
              return <option key={this.state.presets.indexOf(item)}
                             value={this.state.presets.indexOf(item)}>
                {item.name}
              </option>
            })}
          </select>
        </div>
    )
  }

  componentWillMount() {
    this.loadPresets().then(presets => this.setState({presets: presets.data}));
  }

  loadPresets() {
    return axios.get(PRESETS_URL);
  }
}

const mapStateToProps = state => ({
  initialState: state.table.initialState,
  toLoad: state.saves.toLoad,
  errors: state.errors,
});

export default connect(mapStateToProps, {loadSaveOrPreset})(PresetSelector);