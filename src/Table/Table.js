import React, {Component} from 'react';
import Modal from 'react-modal'
import City from "./City/City";
import Product from "./Product/Product";
import './Table.css'

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: this.defaultCities,
            products: ["Cloth", "Grain", "Iron", "Tools"],
            productsMinBuyPrices: [],
            productsMaxSellPrices: [],
            confirmationIsOpened: false,
            isConfirmingCity: true,
            valueToDelete: "",
            modalIsOpen: false,
            isAddingCity: false,
            newName: ""
        };

        this.state.products.forEach(product => {
                this.state.productsMaxSellPrices.push({product: product, price: 0});
                this.state.productsMinBuyPrices.push({product: product, price: Number.MAX_SAFE_INTEGER});
            }
        );

        this.openAddingModal = this.openAddingModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeAddingModal = this.closeAddingModal.bind(this);
        this.closeConfirmationModal = this.closeConfirmationModal.bind(this);
        this.openConfirmationModal = this.openConfirmationModal.bind(this);
        this.afterOpenConfirmation = this.afterOpenConfirmation.bind(this);
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

    handleEnterClick(e){
        if (e.keyCode === 13) {
            console.log(e)
        }
    }


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
                                                buyPrice={0} sellPrice={0}/>
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

                <div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeAddingModal}
                        contentLabel="Example Modal"
                        style={modalStyles}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title">Add a new
                                {this.state.isAddingCity
                                    ? " city"
                                    : " product"
                                }.
                            </h5>
                            <button type="button" className="close"
                                    onClick={this.closeAddingModal}
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body row justify-content-around align-items-center">
                            <label>Name:</label>
                            <input className={"form-control Table-modal-input"}
                                   onChange={(ev) => this.setState({newName: ev.target.value})}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success"
                                    onClick={this.addNew.bind(this)}>
                                Add
                            </button>
                            <button type="button" className="btn btn-danger"
                                    onClick={this.closeAddingModal.bind(this)}>
                                Close
                            </button>
                        </div>
                    </Modal>

                    <Modal
                        isOpen={this.state.confirmationIsOpened}
                        onAfterOpen={this.afterOpenConfirmation}
                        onRequestClose={this.closeConfirmationModal}
                        contentLabel="Confirmation"
                        style={modalStyles}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title">
                                You are going to delete
                                {this.state.isConfirmingCity ? " city " : " product "}
                                "{this.state.valueToDelete}".
                                Are you sure?
                            </h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger"
                                    onClick={this.state.isConfirmingCity
                                        ? this.removeCity.bind(this, this.state.valueToDelete)
                                        : this.removeProduct.bind(this, this.state.valueToDelete)
                                    }
                            >
                                Delete
                            </button>
                            <button type="button" className="btn btn-success"
                                    onClick={this.closeConfirmationModal}>
                                Cancel
                            </button>
                        </div>
                    </Modal>
                </div>

            </div>

        )
    }

    showRemoveCityConfirmation(city) {
        this.setState({isConfirmingCity: true});
        this.openConfirmationModal(city);
    }

    showRemoveProductConfirmation(product) {
        this.setState({isConfirmingCity: false});
        this.openConfirmationModal(product);
    }

    removeCity(cityName) {
        let cities = this.state.cities;
        let index = cities.indexOf(cityName);
        console.log(index);
        cities.splice(index, 1);
        this.setState({cities: cities});

        this.closeConfirmationModal();
    }

    removeProduct(productName) {
        let cities = this.state.products;
        let index = cities.indexOf(productName);
        console.log(index);
        cities.splice(index, 1);
        this.setState({products: cities});

        this.closeConfirmationModal();
    }

    addNew() {
        if (this.state.isAddingCity) {
            this.setState({cities: this.state.cities.concat(this.state.newName)});
        } else {
            this.setState({products: this.state.products.concat(this.state.newName)});
        }
        this.setState({modalIsOpen: false});
    }

    openAddingModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {

    }

    closeAddingModal() {
        this.setState({modalIsOpen: false});
    }

    componentDidMount() {

    }

    showAddProductModal() {
        this.setState({isAddingCity: false});
        this.openAddingModal();
    }

    showAddCityModal() {
        this.setState({isAddingCity: true});
        this.openAddingModal();
    }

    openConfirmationModal(valueToDelete) {
        this.setState({valueToDelete: valueToDelete});
        this.setState({confirmationIsOpened: true});
    }

    closeConfirmationModal() {
        this.setState({confirmationIsOpened: false});
    }

    afterOpenConfirmation() {

    }
}

export default Table;