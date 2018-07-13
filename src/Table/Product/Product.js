import React, {Component} from 'react';
import './Product.css'

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            buyPrice: props.buyPrice,
            isBuyPriceMin: false,
            sellPrice: props.sellPrice,
            isSellPriceMax: false
        };
    }

    render() {
        return (
            <td className={"Product"}>
                <div className={"Product-content"}>
                    <input
                        className={"Product-input Product-input-right"
                        + this.state.isBuyPriceMin ? " Product-min-price" : ""}
                        placeholder={"buy"}
                        type={"text"}
                        onChange={this.handleBuyPriceChange.bind(this)}
                        value={this.state.buyPrice}
                    />
                    <div className={"mx-2"}>/</div>
                    <input className={"Product-input Producct-input-left"
                    // + this.state.isSellPriceMax ? " Product-max-price" : ""
                    }

                           placeholder={"sell"}
                           type={"text"}
                           onChange={this.handleSellPriceChange.bind(this)}
                           value={this.state.sellPrice}
                    />
                </div>
            </td>
        )
    }

    handleBuyPriceChange(e) {
        this.setState({buyPrice: e.target.value});
    }

    handleSellPriceChange(e) {
        this.setState({sellPrice: e.target.value});
    }

    componentDidMount() {

    }
}

export default Product;