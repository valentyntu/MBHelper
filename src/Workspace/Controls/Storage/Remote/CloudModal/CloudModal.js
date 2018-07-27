import React, {Component} from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import savesUrl from "../savesURL";
import "./CloudModal.css";

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

class CloudModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isUploading: false,
            newSaveName: "",
            saves: []
        };

        this.closeAddingModal = this.closeAddingModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
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
                {
                    this.state.isUploading &&
                    <div>
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Choose a name for a new save
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
                                    <input className={"form-control Table-modal-input"}
                                           type={"text"}
                                           onBlur={this.setNewName.bind(this)}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success"
                                    onClick={this.handleAddingNew.bind(this)}>
                                Upload
                            </button>
                            <button type="button" className="btn btn-danger"
                                    onClick={this.closeAddingModal.bind(this)}>
                                Close
                            </button>
                        </div>
                    </div>
                }
                {
                    !this.state.isUploading &&
                    <div>
                        {
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {
                                        (this.state.saves.length === 0) &&
                                        "Looks like you don't have any saves on the cloud."
                                    }
                                    {
                                        (this.state.saves.length > 0) &&
                                        "Load from cloud"
                                    }
                                </h5>
                                <button type="button" className="close"
                                        onClick={this.closeAddingModal}
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        }

                        <div className="modal-body">
                            <ul className="list-group">
                                {this.state.saves.map(save => {
                                    return <li key={save._id} className="list-group-item list-group-item-info d-flex flex-row flex-nowrap">
                                        <div
                                            className="d-flex flex-row flex-nowrap button-list-item justify-content-end"
                                            onClick={this.handleLoading.bind(this, save)}>
                                            <div className="ml-0 mr-3">{save.name}</div>
                                            <div
                                                className="mr-2">
                                                {new Date(save.createdAt).toLocaleDateString()}
                                                &nbsp;
                                                {new Date(save.createdAt).toLocaleTimeString()}
                                            </div>


                                        </div>
                                        <button type="button" className="close ml-auto"
                                                onClick={this.deleteSave.bind(this, save)}
                                                aria-label="Close">
                                            <i className="fas fa-trash"/>
                                        </button>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                }
            </Modal>
        )
    }

    handleAddingNew() {
        this.props.onChange("upload", this.state.newSaveName);
        this.loadSaves();
        this.closeAddingModal();
    }

    handleLoading(save) {
        this.props.onChange("download", save);
        this.closeAddingModal();
    }

    setNewName(ev) {
        let newName = ev.target.value;
        this.setState({newSaveName: newName});
    }

    deleteSave(save) {
        return axios.delete(`${savesUrl}/${save._id}`)
            .then(save => this.loadSaves())
            .catch();
    }

    openAddingModal() {
        this.setState({isOpen: true});
    }

    afterOpenModal() {
        this.loadSaves();
    }

    closeAddingModal() {
        this.setState({isOpen: false});
    }

    componentDidMount() {

    }

    componentWillMount() {
        this.loadSaves();
        Modal.setAppElement('body');
    }

    loadSaves() {
        if (this.props.auth.isAuthenticated()) {
            let sub = localStorage.getItem('sub');
            axios.get(`${savesUrl}?sub=${sub}`)
                .then(saves => {
                    this.setState({saves: saves.data});
                })
                .catch(err => console.error(err));
        }
    }
}

export default CloudModal;