import React, {Component} from 'react';
import './Product.css'

class Product extends Component {

    render() {
        return (
            <th className={"Table-heading"}>
                <div className={"row justify-content-center align-items-center"}>
                    <div>{this.props.productName}</div>
                    <button onClick={this.handleRemoveProduct.bind(this)}
                            className={"Table-remove-btn ml-2"}>
                        -
                    </button>
                </div>
            </th>
        )
    }

    componentDidMount() {

    }

    handleRemoveProduct(){
        this.props.onChange(this.props.productName);
    }
}

export default Product;