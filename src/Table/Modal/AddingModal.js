import React, {Component} from 'react';
import Modal from 'react-modal'

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
            isAddingCity: false
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
                <div className="modal-body row justify-content-around align-items-center">
                    <label>Name:</label>
                    <input className={"form-control Table-modal-input"}
                           onBlur={this.handleAddingNew.bind(this)}
                    />
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

    handleAddingNew(ev) {
        this.props.onChange((this.state.isAddingCity ? "city" : "product"), ev.target.value);
        this.closeAddingModal();
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

    componentWillMount(){
        Modal.setAppElement('body');
    }
}

export default AddingModal;