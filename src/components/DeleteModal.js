import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const DeleteModal = ({openModal, closeModal, handleDelete, listDelete, deleteBlog}) => {
    
    return (
        <>
        <Modal show={openModal} onHide={closeModal} backdrop="static">
            <Modal.Header closeButton>
                {!!listDelete ? <Modal.Title>Delete List</Modal.Title> : 
                deleteBlog ? <Modal.Title>Delete Blog</Modal.Title> : 
                <Modal.Title>Delete Account</Modal.Title>}
            </Modal.Header>
            
            {!!listDelete ? 
            <Modal.Body>Deleting your list along with your tasks? <br/>I hope you finished them!</Modal.Body> : 
            deleteBlog ? <Modal.Body>Are you sure you want to delete this blog?</Modal.Body> :
             <Modal.Body>Are you sure you want to permanently delete your account?</Modal.Body>}
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}> Close </Button>
                <Button variant="primary" onClick={handleDelete}> Delete</Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default DeleteModal;

