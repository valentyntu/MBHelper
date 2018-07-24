import React, {Component} from 'react';
import Modal from 'react-modal'
import "./Modal.css"

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

class AddingModal extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            isAddingCity: false,
            newName: "",
            isValid: undefined
        };

        this.openAddingModal = this.openAddingModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeAddingModal = this.closeAddingModal.bind(this);
    }

    render() {
        return (
            <Modal
                isOpen={this.state.isOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeAddingModal}
                contentLabel="Adding modal"
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
                <div className={"Modal-content modal-body"}>
                    <div className={"Modal-row"}>
                        <span className={"mr-2"}>Name:</span>
                        <div>
                            <input className={"form-control Table-modal-input" +
                            (this.state.isValid ? " is-valid" : (this.state.isValid === undefined ? "" : " is-invalid"))
                            }
                                   onBlur={this.setNewName.bind(this)}
                                   type={"text"}
                                   required={true}
                            />
                            {this.state.isValid === false &&
                            <div className={"Modal-hint-invalid"}>Should be unique and not empty.</div>}
                        </div>

                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success"
                            onClick={this.handleAddingNew.bind(this)}>
                        Add
                    </button>
                    <button type="button" className="btn btn-danger"
                            onClick={this.closeAddingModal.bind(this)}>
                        Close
                    </button>
                </div>
            </Modal>
        )
    }

    handleAddingNew() {
        if (this.state.isValid) {
            this.props.onChange((this.state.isAddingCity ? "city" : "product"), this.state.newName);
            this.closeAddingModal();
        }
    }

    setNewName(ev) {
        let newName = ev.target.value;
        this.setState({
            newName: newName,
            isValid: this.validateNewName(newName)
        })
    }

    validateNewName(newName) {
        if (!this.state.invalidValues.includes(newName) && newName !== "") {
            return true;
        } else {

            return false;
        }

    }

    openAddingModal() {
        this.setState({isOpen: true});
    }

    afterOpenModal() {

    }

    closeAddingModal() {
        this.setState({isOpen: false});
    }

    componentDidMount() {

    }

    componentWillMount() {
        Modal.setAppElement('body');
    }
}

export default AddingModal;