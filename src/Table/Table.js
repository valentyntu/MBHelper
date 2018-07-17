import React, {Component} from 'react';
import City from "./City/City";
import Product from "./Product/Product";
import './Table.css'
import AddingModal from "./Modal/AddingModal";
import ConfirmationModal from "./Modal/ConfirmationModal";

const defaultCities = [
    "Ahmerrad",
    "Bariyye",
    "Curaw",
    "Dhirim",
    "Durquba",
    "Halmar",
    "Ichamur",
    "Jelkala",
    "Khudan",
    "Narra",
    "Praven",
    "Reyvadin",
    "Rivacheg",
    "Sargoth",
    "Shariz",
    "Suno",
    "Tihr",
    "Tulga",
    "Uxkhal",
    "Veluca",
    "Wercheg",
    "Yalen"
];

const defaultProducts = [
    "Cloth", "Grain", "Iron", "Tools"
];

class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cities: defaultCities,
            products: defaultProducts,
            prices: []
        };

        this.table = React.createRef();
        this.addingModal = React.createRef();
        this.confirmationModal = React.createRef();

        this.state.products.forEach(product => {
                this.state.cities.forEach(city => this.state.prices.push(
                    {key: city + "-" + product, buy: Number.MAX_SAFE_INTEGER, sell: 0})
                );
            }
        );
    }


    render() {
        return (
            <div>
                <table ref={this.table} className={"Table table table-bordered table-striped"}>
                    <thead>
                    <tr>
                        <th className={"Table-heading"}>#</th>
                        {this.state.products.map(product => {
                            return <th className={"Table-heading"}
                                       key={product}>
                                <div className={"row justify-content-center align-items-center"}>
                                    <div>{product}</div>
                                    <button onClick={this.showRemoveProductConfirmation.bind(this, product)}
                                            className={"Table-remove-btn ml-2"}>
                                        -
                                    </button>
                                </div>
                            </th>
                        })}

                        <th className={"Table-heading"}>
                            <button onClick={this.showAddProductModal.bind(this)}
                                    type={"button"}
                                    className={"Table-add-btn"}>
                                +
                            </button>
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.state.cities.map(city => {
                        return <tr key={city}>
                            <City key={city} cityName={city}/>
                            {this.state.products.map((product) => {
                                return <Product key={city + "-" + product}
                                                onChange={this.handlePriceChange.bind(this, city, product)}
                                                isBuyPriceMin={this.checkMinPrice(product, this.getCurrentPrice(city, product, "buy"))}
                                                isSellPriceMax={this.checkMaxPrice(product, this.getCurrentPrice(city, product, "sell"))}
                                                buyPrice={this.getCurrentPrice(city, product, "buy")}
                                                sellPrice={this.getCurrentPrice(city, product, "sell")}
                                />
                            })}
                            <td>
                                <button className={"Table-remove-btn"}
                                        onClick={this.showRemoveCityConfirmation.bind(this, city)}>
                                    -
                                </button>
                            </td>
                        </tr>
                    })}

                    <tr>
                        <th className={"Table-heading"}>
                            <button onClick={this.showAddCityModal.bind(this)}
                                    type={"button"}
                                    className={"Table-add-btn"}>
                                +
                            </button>
                        </th>
                    </tr>
                    </tbody>

                </table>

                <AddingModal ref={this.addingModal} onChange={this.addNew.bind(this)}/>
                <ConfirmationModal ref={this.confirmationModal} onChange={this.remove.bind(this)}/>
            </div>
        )
    }

    showRemoveCityConfirmation(city) {
        this.confirmationModal.current.setState({
            isOpen: true,
            isRemovingCity: true,
            valueToDelete: city
        });
    }

    showRemoveProductConfirmation(product) {
        this.confirmationModal.current.setState({
            isOpen: true,
            isRemovingCity: false,
            valueToDelete: product
        });
    }

    remove(type, value) {
        if (type === "city") {
            this.removeCity(value);
        }
        if (type === "product") {
            this.removeProduct(value);
        }
    }

    removeCity(cityName) {
        let cities = this.state.cities;
        let index = cities.indexOf(cityName);
        cities.splice(index, 1);
        this.setState({cities: cities});
    }

    removeProduct(productName) {
        let cities = this.state.products;
        let index = cities.indexOf(productName);
        cities.splice(index, 1);
        this.setState({products: cities});
    }

    addNew(type, value) {
        if (type === "city") {
            this.setState({cities: this.state.cities.concat(value)});
        }
        if (type === "product") {
            this.setState({products: this.state.products.concat(value)});
        }
    }

    componentDidMount() {

    }

    showAddProductModal() {
        this.addingModal.current.setState({
            isAddingCity: false,
            isOpen: true
        });
    }

    showAddCityModal() {
        this.confirmationModal.current.setState({
            isAddingCity: true,
            isOpen: true
        });
    }

    checkMinPrice(product, value) {
        if (value < Number.MAX_SAFE_INTEGER) {
            let prices = this.state.prices.filter(price => price.key.includes(product));
            let minPrice = Number.MAX_SAFE_INTEGER;
            prices.forEach(price => {
                if (minPrice > price.buy) {
                    minPrice = price.buy;
                }
            });
            return value === minPrice;
        } else {
            return false;
        }
    }

    checkMaxPrice(product, value) {
        if (value > 0) {
            let prices = this.state.prices.filter(price => price.key.includes(product));
            let maxPrice = 0;
            prices.forEach(price => {
                if (maxPrice < price.sell) {
                    maxPrice = price.sell;
                }
            });
            return value === maxPrice;
        } else {
            return false;
        }
    }

    getCurrentPrice(city, product, type) {
        let price = this.state.prices.find(item => item.key === city + "-" + product);
        if (price !== undefined) {
            if (type === "buy") {
                return price.buy;
            }
            if (type === "sell") {
                return price.sell;
            }
        }
        return 0;
    }

    handlePriceChange(city, product, type, value) {
        let newPrice = this.state.prices.find(item => item.key === city + "-" + product);
        if (type === "sell") {
            newPrice.sell = value;
        }
        if (type === "buy") {
            newPrice.buy = value;
        }
        let newPrices = [];
        this.state.prices.forEach(oldPrice => {
            if (newPrice.key === oldPrice.key) {
                newPrices.push(newPrice)
            } else {
                newPrices.push(oldPrice)
            }
        });
        this.setState({prices: newPrices});
    }
}

export default Table;