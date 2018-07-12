import React, {Component} from 'react';
import City from "../City/City";
import Product from "../Product/Product";
import './Table.css'

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: this.defaultCities,
            products: ["Cloth", "Grain", "Iron", "Tools"],
            productsPrices: []
        };
    }

    defaultCities = [
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

    render() {
        return (
            <div>
                <table className={"Table table table-bordered table-striped"}>
                    <thead>
                    <tr>
                        <th className={"Table-heading"}>#</th>
                        {this.state.products.map(product => {
                            return <th className={"Table-heading"}
                                       key={product}>
                                <div className={"row justify-content-center align-items-center"}>
                                    <div>{product}</div>
                                    <button onClick={this.removeProduct.bind(this, product)}
                                            className={"Table-remove-btn align-self-end mx-3"}>
                                        -
                                    </button>
                                </div>
                            </th>
                        })}
                        <th className={"Table-heading"}>
                            <button onClick={this.showProductModal}
                                    type={"button"}
                                    className={"Table-add-btn"}
                                    data-toggle="modal"
                                    data-target="#exampleModal">
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
                                return <Product key={city + "-" + product} buyPrice={0} sellPrice={0}/>
                            })}
                            <td>
                                <button className={"Table-remove-btn"}
                                        onClick={this.removeCity.bind(this, city)}>
                                    -
                                </button>
                            </td>
                        </tr>
                    })}
                    <tr>
                        <th className={"Table-heading"}>
                            <button onClick={this.showCityModal}
                                    type={"button"}
                                    className={"Table-add-btn"}
                                    data-toggle="modal"
                                    data-target="#exampleModal">
                                +
                            </button>
                        </th>
                    </tr>
                    </tbody>
                </table>

                <div className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Modal body text goes here.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Save changes</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    removeCity(cityName) {
        let cities = this.state.cities;
        let index = cities.indexOf(cityName);
        console.log(index);
        cities.splice(index, 1);
        this.setState({cities: cities});
    }

    removeProduct(productName) {
        let cities = this.state.products;
        let index = cities.indexOf(productName);
        console.log(index);
        cities.splice(index, 1);
        this.setState({products: cities});
    }

    componentDidMount() {

    }
}

export default Table;