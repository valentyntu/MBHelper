import React, {Component} from 'react';
import Navbar from './Navbar/Navbar';
import Table from './Table/Table';
import Help from './Help/Help';

class Workspace extends Component {
  render() {
    return (
        <div>
          <Navbar/>
          {this.props.isHelpShown && <Help/>}
          <Table/>
        </div>
    )
  }
}

export default Workspace;