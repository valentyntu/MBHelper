import React, {Component} from 'react';
import Navbar from "./Navbar/Navbar";
import Table from "./Table/Table";

class Workspace extends Component {
    constructor() {
        super();
        this.state = {
            tableState: []
        };
        this.table = React.createRef();
    }

    render() {
        return (
            <div>
                <Navbar auth={this.props.auth} onUpdate={this.load.bind(this)}/>
                <Table ref={this.table}
                       onChange={this.updateTableState.bind(this)}
                />
            </div>
        )
    }

    componentDidMount() {

    }

    updateTableState(state) {
        this.setState({tableState: state})
    }

    load(saveOrPreset) {
        this.table.current.setState(saveOrPreset);
    }
}

export default Workspace;