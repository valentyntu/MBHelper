import React, {Component} from 'react';
import Navbar from "./Navbar/Navbar";
import Table from "./Table/Table";
import Help from "../Help/Help";

class Workspace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableState: []
        };
        this.table = React.createRef();
    }

    render() {
        return (
            <div>
                <Navbar auth={this.props.auth} tableState={this.state.tableState} onUpdate={this.load.bind(this)}/>
                {this.props.isHelpShown && <Help/>}
                <Table ref={this.table}
                       onChange={this.updateTableState.bind(this)}
                />
            </div>
        )
    }

    componentDidMount() {

    }

    componentWillMount() {
    }

    updateTableState(state) {
        this.setState({tableState: state})
    }

    load(saveOrPreset) {
        this.table.current.setState(saveOrPreset);
    }
}

export default Workspace;