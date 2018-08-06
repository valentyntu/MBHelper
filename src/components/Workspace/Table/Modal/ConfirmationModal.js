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

class ConfirmationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isRemovingCity: true,
      valueToDelete: ''
    };

    this.closeConfirmationModal = this.closeConfirmationModal.bind(this);
    this.openConfirmationModal = this.openConfirmationModal.bind(this);
    this.afterOpenConfirmation = this.afterOpenConfirmation.bind(this);
  }

  render() {
    return (
        <Modal
            isOpen={this.state.isOpen}
            onAfterOpen={this.afterOpenConfirmation}
            onRequestClose={this.closeConfirmationModal}
            contentLabel="Confirmation"
            style={modalStyles}
        >
          <div className="modal-header">
            <h5 className="modal-title">
              You are going to delete
              {this.state.isRemovingCity ? ' city ' : ' product '}
              "{this.state.valueToDelete}".
              Are you sure?
            </h5>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger"
                    onClick={this.handleDeleting.bind(this)}
            >
              Delete
            </button>
            <button type="button" className="btn btn-success"
                    onClick={this.closeConfirmationModal}>
              Cancel
            </button>
          </div>
        </Modal>
    )
  }

  handleDeleting() {
    this.props.onChange((this.state.isRemovingCity ? 'city' : 'product'), this.state.valueToDelete);
    this.closeConfirmationModal();
  }

  openConfirmationModal() {
    this.setState({isOpen: true});
  }

  closeConfirmationModal() {
    this.setState({isOpen: false});
  }

  afterOpenConfirmation() {

  }

  componentDidMount() {

  }

  componentWillMount() {
    Modal.setAppElement('body');
  }
}

export default ConfirmationModal;