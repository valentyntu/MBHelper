import React, {Component} from 'react';
import "./PresetSelector.css"

const PRESETS_URL = "http://localhost:4000/presets";

class PresetSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presets: [],
            selectedItem: 0
        };
        this.select = React.createRef();
    }

    render() {
        return (
            <div className={"PresetSelector-container"}>
                <button className={"btn btn-primary PresetSelector-load-btn"}
                        onClick={this.handlePresetChange.bind(this)}
                >Load Preset</button>
                <select ref={this.select}
                        className={"custom-select custom-select-lg PresetSelector-select"}>
                    {this.state.presets.map(item => {
                        return <option key={this.state.presets.indexOf(item)} value={this.state.presets.indexOf(item)}>
                            {item.name}
                        </option>
                    })}
                </select>
            </div>
        )
    }

    componentDidMount() {

    }

    componentWillMount(){
        this.loadPresets().then(presets => this.setState({presets: presets}));
    }

    loadPresets() {
        return fetch(PRESETS_URL)
            .then(r => r.json());
    }

    handlePresetChange() {
        this.props.onChange(this.state.presets[this.select.current.value]);
    }
}

export default PresetSelector;