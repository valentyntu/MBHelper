import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal'
import City from "./City/City";
import Product from "./Product/Product";
import './Table.css'

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: this.defaultCities,
            products: ["Cloth", "Grain", "Iron", "Tools"],
            productsPrices: [],
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
                            <button onClick={this.openModal}
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

                <div>
                    <button onClick={this.openModal}>Open Modal</button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >

                        <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
                        <button onClick={this.closeModal}>close</button>
                        <div>I am a modal</div>
                        <form>
                            <input />
                            <button>tab navigation</button>
                            <button>stays</button>
                            <button>inside</button>
                            <button>the modal</button>
                        </form>
                    </Modal>
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

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    componentDidMount() {

    }
}

export default Table;