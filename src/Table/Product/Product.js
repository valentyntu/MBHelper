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
                        // value={this.props.buyPrice}
                        name={"buyPrice"}
                    />
                    <div className={"mx-2"}>/</div>
                    <input className={"Product-input Product-input-left"
                    + (this.props.isSellPriceMax ? " Product-max-price" : "")}
                           placeholder={"sell"}
                           type={"text"}
                           onBlur={this.onSellPriceChange.bind(this)}
                           onClick={(ev) => ev.target.select()}
                        // value={this.props.buyPrice}
                           name={"sellPrice"}
                    />
                </div>
            </td>
        )
    }


    onBuyPriceChange(e) {
        e.persist();
        if (e.target.value !== "") {
            this.props.onChange(e, "buy", parseInt(e.target.value, 10));
            e.target = this;
        }
    }

    onSellPriceChange(e) {
        e.persist();
        if (e.target.value !== "") {
            this.props.onChange(e, "sell", parseInt(e.target.value, 10));
            e.target = this;
            console.log(this);
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
