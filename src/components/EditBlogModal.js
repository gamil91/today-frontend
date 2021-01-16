import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap'

const EditBlogModal = (openModal, closeModal, handleEdit) => {
    return (
        <>
       <Modal show={openModal} onHide={closeModal} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to permanently delete your account?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}> Close </Button>
                <Button variant="primary" onClick={handleEdit}> Delete</Button>
            </Modal.Footer>
        </Modal>
    </>
    );
} 

export default EditBlogModal;
