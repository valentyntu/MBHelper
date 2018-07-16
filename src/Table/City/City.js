import React, {Component} from 'react';
import './City.css'

class City extends Component {

    render() {
        return (
            <th className={"City"}>{this.props.cityName}</th>
        )
    }

    componentDidMount() {

    }
}

export default City;