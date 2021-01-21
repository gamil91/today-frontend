import React, { Component } from 'react'
import NewUserCarousel from './NewUserCarousel';
import { Modal } from 'react-bootstrap'

class NewUserModal extends Component {
    render() {
        return (
            <div>
                <Modal 
                    size="lg"
                    show={this.props.openModal} 
                    onHide={this.props.closeModal} 
                    backdrop="static">
                    <Modal.Body>
                        <NewUserCarousel close={this.props.closeModal}/>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default NewUserModal;
