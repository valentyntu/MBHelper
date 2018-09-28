import React, {Component} from 'react';
import './Product.css'

class Product extends Component {

  render() {
    return (
        <th className={'Table-heading'}>
          {this.props.productName}
          <button onClick={this.handleRemoveProduct.bind(this)}
                  className={'btn btn-danger Table-btn ml-1'}>
            <i className="fas fa-minus icon-small"/>
          </button>
        </th>
    )
  }

  handleRemoveProduct() {
    this.props.onChange(this.props.productName);
  }
}

export default Product;
