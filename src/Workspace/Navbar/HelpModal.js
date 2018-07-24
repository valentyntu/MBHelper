import React, {Component} from 'react';
import Modal from 'react-modal'

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '60%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class HelpModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.closeModal = this.closeModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
    }

    render() {
        return (
            <Modal
                isOpen={this.state.isOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel="Help"
                style={modalStyles}
            >
                <div className="modal-header">
                    <h2 className="modal-title">
                        Mount & Blade Trade Helper
                    </h2>
                </div>
                <div className={"modal-body"}>
                    <h4>Intro</h4>
                    <p className={"lead"}>
                        This application is designed to help you with remembering prices in different places
                        while playing Mount & Blade.

                    </p>
                    <h4>Prices</h4>
                    <p className={"lead"}>
                        Table's row represents city and column represents a product.
                        To set/change buying or selling price just click on desired placeholder and start typing.
                        You can use "Tab" to navigate through the row
                        (useful when you want to set all goods' prices in one city quickly).
                        After you set prices, lowest buying price and highest selling price will be marked for each
                        product. Empty cells are just ignored. If you want to use float numbers - use "." as decimal separator.
                    </p>
                    <h4>Presets</h4>
                    <p className={"lead"}>
                        Button "Load Preset" loads selected preset from the dropdown on the right. There are presets with all
                        cities from "Warband" and "With Fire & Sword". You can also select "Empty" if you would like to use
                        this app for another mod or even other game with similar trading mechanics.
                    </p>
                    <h4>Saving and Loading</h4>
                    <p className={"lead"}>You can save your current table's state to file by clicking "Save" button.
                        Button "Load" allows you to load a save from file. If you would like to store your saves on server
                        you have to log in using button at the right top corner. After that, you will see "Upload" and "Download"
                        buttons, those work as "Save" and "Load".
                    </p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success"
                            onClick={this.closeModal}>
                        Got it!
                    </button>
                </div>
            </Modal>
        )
    }

    closeModal() {
        this.setState({isOpen: false});
    }

    afterOpenModal() {
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }
}

export default HelpModal;