import React, {Component} from 'react';
import './Product.css'

class Product extends Component {

    render() {
        return (
            <th className={"Table-heading"}>
                <div className={"row justify-content-center align-items-center"}>
                    <span>
                        {this.props.productName}
                    </span>
                    <button onClick={this.handleRemoveProduct.bind(this)}
                            className={"btn btn-danger Table-btn ml-1"}>
                        <i className="fas fa-minus"/>
                    </button>
                </div>
            </th>
        )
    }

    componentDidMount() {

    }

    handleRemoveProduct() {
        this.props.onChange(this.props.productName);
    }
}

export default Product;