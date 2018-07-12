import React, {Component} from 'react';
import './Product.css'

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {name: ""};
    }

    render() {
        return (
            <td className={"Product"}>
                <div className={"Product-content"}>
                    <input className={"Product-input"} placeholder={"buy"} type={"text"}/>
                    /
                    <input className={"Product-input"} placeholder={"sell"} type={"text"}/>
                </div>
            </td>
        )
    }

    componentDidMount() {

    }
}

// value={this.props.buyPrice}
// value={this.props.sellPrice}
export default Product;