import React, {Component} from 'react';

class City extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <th>{this.props.cityName}</th>
        )
    }

    componentDidMount() {

    }
}

export default City;