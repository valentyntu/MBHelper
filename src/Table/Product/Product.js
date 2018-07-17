import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Product.css'

class Product extends Component {

    render() {
        return (
            <td className={"Product"}>
                <div className={"Product-content"}>
                    <input
                        className={"Product-input Product-input-right"
                        + (this.props.isBuyPriceMin ? " Product-min-price" : "")}
                        placeholder={"buy"}
                        type={"text"}
                        onBlur={this.onBuyPriceChange.bind(this)}
                        onClick={(ev) => ev.target.select()}
                        defaultValue={this.props.buyPrice === Number.MAX_SAFE_INTEGER ? "" : this.props.buyPrice}
                    />
                    <div className={"Product-value-separator"}>/</div>
                    <input
                        className={"Product-input Product-input-left"
                        + (this.props.isSellPriceMax ? " Product-max-price" : "")}
                        placeholder={"sell"}
                        type={"text"}
                        onBlur={this.onSellPriceChange.bind(this)}
                        onClick={(ev) => ev.target.select()}
                        defaultValue={this.props.sellPrice === 0 ? "" : this.props.sellPrice}
                    />
                </div>
            </td>
        )
    }


    onBuyPriceChange(e) {
        let value = e.target.value;
        if (value !== "") {
            this.props.onChange("buy", parseInt(value, 10));
        }
    }

    onSellPriceChange(e) {
        let value = e.target.value;
        if (value !== "") {
            this.props.onChange("sell", parseInt(value, 10));
        }
    }

    componentDidMount() {

    }
}

export default Product;

Product.propTypes = {
    isSellPriceMax: PropTypes.bool,
    isBuyPriceMin: PropTypes.bool
};
