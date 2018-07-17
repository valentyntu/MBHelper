import React, {Component} from 'react';
import presets from "./Presets";
import "./PresetSelector.css"

class PresetSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedItem: 0};
        this.select = React.createRef();
    }

    render() {
        return (
            <div className={"PresetSelector-container"}>
                <label className={"PresetSelector-label"}>Select Preset:</label>
                <select ref={this.select} onChange={this.handlePresetChange.bind(this)}
                        className={"custom-select custom-select-lg PresetSelector-select"}
                >
                    {presets.map(item => {
                        return <option key={presets.indexOf(item)} value={presets.indexOf(item)}>{item.name}</option>
                    })}
                </select>
            </div>
        )
    }

    componentDidMount() {

    }

    handlePresetChange() {
        this.props.onChange(presets[this.select.current.value]);
    }
}

export default PresetSelector;