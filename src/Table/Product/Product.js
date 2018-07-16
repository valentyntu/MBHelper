import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Product.css'

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buyPrice: 0,
            sellPrice: 0,
            isBuyPriceMin: props.isBuyPriceMin,
            isSellPriceMax: props.isSellPriceMax
        };
        this.buyPriceInput = React.createRef();
        this.sellPriceInput = React.createRef();
    };

    render() {
        return (
            <td className={"Product"}>
                <div className={"Product-content"}>
                    <input
                        ref={this.buyPriceInput}
                        className={"Product-input Product-input-right"
                        + (this.state.isBuyPriceMin ? " Product-min-price" : "")}
                        placeholder={"buy"}
                        type={"text"}
                        onBlur={this.onBuyPriceChange.bind(this)}
                        onClick={(ev) => ev.target.select()}
                        name={"buyPrice"}
                    />
                    <div className={"mx-2"}>/</div>
                    <input
                        ref={this.sellPriceInput}
                        className={"Product-input Product-input-left"
                        + (this.state.isSellPriceMax ? " Product-max-price" : "")}
                        placeholder={"sell"}
                        type={"text"}
                        onBlur={this.onSellPriceChange.bind(this)}
                        onClick={(ev) => ev.target.select()}
                        name={"sellPrice"}
                    />
                </div>
            </td>
        )
    }


    onBuyPriceChange(e) {
        let value = e.target.value;
        if (value !== "") {
            this.props.onChange("buy", parseInt(value, 10));
            this.setState({buyPrice: value})
        }
    }

    onSellPriceChange(e) {
        let value = e.target.value;
        if (value !== "") {
            this.props.onChange("sell", parseInt(value, 10));
            this.setState({buyPrice: value})
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
