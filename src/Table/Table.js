import React, {Component} from 'react';
import City from "../City/City";
import Product from "../Product/Product";
import './Table.css'

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: ["Jelkala", "Veluca", "Yalen"],
            products: ["Cloth", "Grain", "Iron", "Tools"]
        };
    }


    render() {
        return (
            <table className={"Table table table-bordered table-striped"}>
                <thead>
                <tr>
                    <th className={"Table-heading"}>#</th>
                    {this.state.products.map(product => {
                        return <th className={"Table-heading"} key={product}>{product}</th>
                    })}
                    <th className={"Table-heading"}>+</th>
                </tr>
                </thead>
                <tbody>
                {this.state.cities.map(city => {
                    return <tr key={city}>
                        <City key={city} cityName={city}/>
                        {this.state.products.map((product) => {
                            return <Product key={city + "-" + product} buyPrice={0} sellPrice={0}/>
                        })}
                    </tr>
                })}
                <tr>
                    <th>+</th>
                </tr>
                </tbody>
            </table>
        )
    }

    componentDidMount() {

    }
}

export default Table;